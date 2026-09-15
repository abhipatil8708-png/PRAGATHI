import { Router } from 'express';
import { ROLE } from 'shared';
import { requireAuth, requireRole } from '../middleware/auth.middleware';
import {
  getDashboardStats,
  getQuestions,
  getQuestionDetails,
  getProfile,
} from '../controllers/studentController';

const router = Router();

// Protect all student routes
router.use(requireAuth);
router.use(requireRole([ROLE.STUDENT]));

router.get('/dashboard', getDashboardStats);
router.get('/questions', getQuestions);
router.get('/questions/:id', getQuestionDetails);
router.get('/profile', getProfile);

export default router;
