import { Router } from 'express';
import { getMessages } from '../controllers/messageController.js';
import auth from '../middleware/authMiddleware.js';
const router = Router();

router.get('/:groupId', auth, getMessages);

export default router;
