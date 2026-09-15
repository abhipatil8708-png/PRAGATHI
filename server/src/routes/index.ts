import { Router } from 'express';
import healthRoutes from './healthRoutes';
import authRoutes from './authRoutes';
import adminRoutes from './adminRoutes';
import hodRoutes from './hodRoutes';
import questionRoutes from './questionRoutes';
import studentRoutes from './studentRoutes';

const router = Router();

router.use('/', healthRoutes);
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/hod', hodRoutes);
router.use('/faculty/questions', questionRoutes);
router.use('/student', studentRoutes);

export default router;
