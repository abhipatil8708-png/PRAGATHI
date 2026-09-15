import { Router } from 'express';
import { ROLE } from 'shared';
import { requireAuth, requireRole } from '../middleware/auth.middleware';
import { getDashboardStats, listUsers, updateUserStatus, createUser } from '../controllers/adminController';

const router = Router();

// Protect all admin routes
router.use(requireAuth);
router.use(requireRole([ROLE.ADMIN]));

router.get('/stats', getDashboardStats);
router.get('/users', listUsers);
router.post('/users', createUser);
router.patch('/users/:userId/status', updateUserStatus);

export default router;
