import { Router } from 'express';
import { createUser, checkUser } from '../controller/auth';

const router = Router();

router.post('/signup', createUser);
router.post('/login', checkUser);

export default router;
