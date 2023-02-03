import { Router } from 'express';
import userRoutes from './user';
import authRoutes from './auth';
import auth from '../middleware/auth';

const router = Router();

router.use('/api', authRoutes)
router.use('/api', auth, userRoutes)

export default router;
