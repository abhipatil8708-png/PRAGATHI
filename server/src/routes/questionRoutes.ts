import { Router } from 'express';
import { ROLE } from 'shared';
import { requireAuth, requireRole } from '../middleware/auth.middleware';
import {
  getDashboardStats,
  createQuestion,
  getFacultyQuestions,
  getQuestionDetails,
  updateQuestion,
  resubmitQuestion,
} from '../controllers/questionController';

const router = Router();

// Protect all faculty routes
router.use(requireAuth);
router.use(requireRole([ROLE.FACULTY]));

router.get('/stats', getDashboardStats);
router.post('/', createQuestion);
router.get('/', getFacultyQuestions);
router.get('/:id', getQuestionDetails);
router.put('/:id', updateQuestion);
router.post('/:id/resubmit', resubmitQuestion);

export default router;
