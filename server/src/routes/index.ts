import { Router } from 'express';
import healthRoutes from './healthRoutes';
import authRoutes from './authRoutes';
import adminRoutes from './adminRoutes';
import hodRoutes from './hodRoutes';

const router = Router();

router.use('/', healthRoutes);
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/hod', hodRoutes);

// Placeholder routes for future modules
// router.use('/faculty', facultyRoutes);
// router.use('/student', studentRoutes);

export default router;
