import { Router } from 'express';
import { supabase } from '../lib/supabaseClient.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/users/:id  – public profile
router.get('/:id', async (_req, res) => {
  res.status(501).json({ message: 'TODO: get profile' });
});

// GET /api/users/:userId/listings
// Returns all listings for a specific user
router.get('/:userId/listings', async (req, res) => {
  try {
    const { userId } = req.params;

    // Query listings for a specific seller
    const { data, error } = await supabase
      .from('listings')
      .select(`
        id,
        title,
        description,
        price,
        status,
        created_at,
        category_id,
        categories:category_id (id, name)
      `)
      .eq('seller_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to fetch user listings' });
    }

    res.json({ listings: data });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH /api/users/me  – update own profile
router.patch('/me', requireAuth, async (_req, res) => {
  res.status(501).json({ message: 'TODO: update profile' });
});

// GET /api/users/:id/ratings
router.get('/:id/ratings', async (_req, res) => {
  res.status(501).json({ message: 'TODO: list ratings' });
});

// POST /api/users/:id/ratings
router.post('/:id/ratings', requireAuth, async (_req, res) => {
  res.status(501).json({ message: 'TODO: create rating' });
});

export default router;
