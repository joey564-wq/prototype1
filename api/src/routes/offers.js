import { Router } from 'express';
import { requireAuth, requireVerified } from '../middleware/auth.js';

const router = Router();

// POST /api/offers  – make an offer on a listing
router.post('/', requireAuth, requireVerified, async (_req, res) => {
  res.status(501).json({ message: 'TODO: create offer' });
});

// PATCH /api/offers/:id  – accept / decline offer
router.patch('/:id', requireAuth, requireVerified, async (_req, res) => {
  res.status(501).json({ message: 'TODO: update offer status' });
});

export default router;
