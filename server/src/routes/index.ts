import { Router } from 'express';
import healthRoutes from './healthRoutes';
import authRoutes from './authRoutes';

const router = Router();

router.use('/', healthRoutes);
router.use('/auth', authRoutes);

// Placeholder routes for future modules
// router.use('/admin', adminRoutes);
// router.use('/hod', hodRoutes);
// router.use('/faculty', facultyRoutes);
// router.use('/student', studentRoutes);

export default router;
