import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/users/:id  – public profile
router.get('/:id', async (_req, res) => {
  res.status(501).json({ message: 'TODO: get profile' });
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
