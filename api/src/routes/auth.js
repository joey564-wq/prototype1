import { Router } from 'express';

const router = Router();

// POST /api/auth/register
router.post('/register', async (_req, res) => {
  res.status(501).json({ message: 'TODO: register' });
});

// POST /api/auth/login
router.post('/login', async (_req, res) => {
  res.status(501).json({ message: 'TODO: login' });
});

// POST /api/auth/logout
router.post('/logout', async (_req, res) => {
  res.status(501).json({ message: 'TODO: logout' });
});

export default router;
