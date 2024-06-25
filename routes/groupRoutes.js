import { Router } from 'express';
import { createGroup, joinGroup, leaveGroup } from '../controllers/groupController.js';
import auth from '../middleware/authMiddleware.js';
const router = Router();

router.post('/', auth, createGroup);
router.put('/:groupId/join', auth, joinGroup);
router.put('/:groupId/leave', auth, leaveGroup);

export default router;
