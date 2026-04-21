import { Router } from 'express';
import { requireAuth, requireVerified } from '../middleware/auth.js';

const router = Router();

// GET /api/listings
router.get('/', async (_req, res) => {
  res.status(501).json({ message: 'TODO: list listings' });
});

// GET /api/listings/:id
router.get('/:id', async (_req, res) => {
  res.status(501).json({ message: 'TODO: get listing' });
});

// POST /api/listings
router.post('/', requireAuth, requireVerified, async (_req, res) => {
  res.status(501).json({ message: 'TODO: create listing' });
});

// PATCH /api/listings/:id
router.patch('/:id', requireAuth, requireVerified, async (_req, res) => {
  res.status(501).json({ message: 'TODO: update listing' });
});

// DELETE /api/listings/:id
router.delete('/:id', requireAuth, requireVerified, async (_req, res) => {
  res.status(501).json({ message: 'TODO: delete listing' });
});

export default router;
