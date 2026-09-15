import { Router } from 'express';
import { login, register, logout, me } from '../controllers/authController';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

router.post('/login', login);
router.post('/register', register); // Normally restricted, but provided for foundation testing
router.post('/logout', requireAuth, logout);
router.get('/me', requireAuth, me);

export default router;
