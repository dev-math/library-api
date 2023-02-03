import { Router } from 'express';
import userRoutes from './user';
import authRoutes from './auth';

const router = Router();

router.use('/api', userRoutes)
router.use('/api', authRoutes)

export default router;
