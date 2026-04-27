import { Router } from 'express';
import { supabase } from '../lib/supabaseClient.js';
import { requireAuth, requireVerified } from '../middleware/auth.js';

const router = Router();

// GET /api/listings
// Returns all listings with seller and category information
router.get('/', async (_req, res) => {
  try {
    // Query listings with seller and category data joined
    const { data, error } = await supabase
      .from('listings')
      .select(`
        id,
        title,
        description,
        price,
        status,
        created_at,
        seller_id,
        category_id,
        users:seller_id (id, full_name, email),
        categories:category_id (id, name)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to fetch listings' });
    }

    res.json({ listings: data });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/listings/:id
// Returns a single listing by ID with seller and category information
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Query single listing with seller and category data
    const { data, error } = await supabase
      .from('listings')
      .select(`
        id,
        title,
        description,
        price,
        status,
        created_at,
        seller_id,
        category_id,
        users:seller_id (id, full_name, email),
        categories:category_id (id, name)
      `)
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Listing not found' });
      }
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to fetch listing' });
    }

    res.json({ listing: data });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/listings
// Creates a new listing
// Requires authentication and verified email
router.post('/', requireAuth, requireVerified, async (req, res) => {
  try {
    const { title, description, price, category_id, status = 'available' } = req.body;
    const seller_id = req.user.id; // Get user ID from auth middleware

    // Validate required fields
    if (!title || !price || !category_id) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['title', 'price', 'category_id']
      });
    }

    // Validate price is a positive number
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum < 0) {
      return res.status(400).json({ error: 'Price must be a positive number' });
    }

    // Validate status is one of the allowed values
    if (!['available', 'pending', 'sold'].includes(status)) {
      return res.status(400).json({ 
        error: 'Invalid status',
        allowed: ['available', 'pending', 'sold']
      });
    }

    // Insert new listing into Supabase
    const { data, error } = await supabase
      .from('listings')
      .insert({
        seller_id,
        title,
        description: description || null,
        price: priceNum,
        category_id,
        status
      })
      .select(`
        id,
        title,
        description,
        price,
        status,
        created_at,
        seller_id,
        category_id,
        categories:category_id (id, name)
      `)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to create listing' });
    }

    res.status(201).json({ listing: data });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH /api/listings/:id
// Updates an existing listing
// Requires authentication and verified email
router.patch('/:id', requireAuth, requireVerified, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, category_id, status } = req.body;
    const seller_id = req.user.id;

    // Build update object with only provided fields
    const updates = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (price !== undefined) {
      const priceNum = parseFloat(price);
      if (isNaN(priceNum) || priceNum < 0) {
        return res.status(400).json({ error: 'Price must be a positive number' });
      }
      updates.price = priceNum;
    }
    if (category_id !== undefined) updates.category_id = category_id;
    if (status !== undefined) {
      if (!['available', 'pending', 'sold'].includes(status)) {
        return res.status(400).json({ 
          error: 'Invalid status',
          allowed: ['available', 'pending', 'sold']
        });
      }
      updates.status = status;
    }

    // Verify the listing belongs to the authenticated user
    const { data: existing, error: checkError } = await supabase
      .from('listings')
      .select('seller_id')
      .eq('id', id)
      .single();

    if (checkError || !existing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    if (existing.seller_id !== seller_id) {
      return res.status(403).json({ error: 'Not authorized to update this listing' });
    }

    // Update the listing
    const { data, error } = await supabase
      .from('listings')
      .update(updates)
      .eq('id', id)
      .select(`
        id,
        title,
        description,
        price,
        status,
        created_at,
        seller_id,
        category_id,
        categories:category_id (id, name)
      `)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to update listing' });
    }

    res.json({ listing: data });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/listings/:id
// Deletes a listing
// Requires authentication and verified email
router.delete('/:id', requireAuth, requireVerified, async (req, res) => {
  try {
    const { id } = req.params;
    const seller_id = req.user.id;

    // Verify the listing belongs to the authenticated user
    const { data: existing, error: checkError } = await supabase
      .from('listings')
      .select('seller_id')
      .eq('id', id)
      .single();

    if (checkError || !existing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    if (existing.seller_id !== seller_id) {
      return res.status(403).json({ error: 'Not authorized to delete this listing' });
    }

    // Delete the listing
    const { error } = await supabase
      .from('listings')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to delete listing' });
    }

    res.status(204).send();
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
