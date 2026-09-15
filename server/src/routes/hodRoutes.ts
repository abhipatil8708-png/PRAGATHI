import { Router } from 'express';
import { ROLE } from 'shared';
import { requireAuth, requireRole } from '../middleware/auth.middleware';
import { getDashboardStats, getPendingQuestions, updateQuestionApproval } from '../controllers/hodController';

const router = Router();

// Protect all HOD routes
router.use(requireAuth);
router.use(requireRole([ROLE.HOD]));

router.get('/stats', getDashboardStats);
router.get('/questions/pending', getPendingQuestions);
router.patch('/questions/approvals/:approvalId', updateQuestionApproval);

export default router;
