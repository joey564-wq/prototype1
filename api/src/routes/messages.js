import { Router } from 'express';
import { requireAuth, requireVerified } from '../middleware/auth.js';

const router = Router();

// GET /api/messages  – list conversations for current user
router.get('/', requireAuth, async (_req, res) => {
  res.status(501).json({ message: 'TODO: list conversations' });
});

// GET /api/messages/:conversationId  – messages in a conversation
router.get('/:conversationId', requireAuth, async (_req, res) => {
  res.status(501).json({ message: 'TODO: get messages' });
});

// POST /api/messages  – send a message / start a conversation
router.post('/', requireAuth, requireVerified, async (_req, res) => {
  res.status(501).json({ message: 'TODO: send message' });
});

export default router;
