import { Router } from 'express';
import { createUser, checkUser, listUsers } from '../controller/user';

const router = Router();

// GET: /me current user details

router.post('/users', createUser);
router.post('/login', checkUser);

router.delete('/users/:userid');

router.get('/users/:userid', listUsers);
router.get('/users', listUsers); // TODO: remove this route

router.put('/users/:userid');

// GET: /users/:userId/booklists list booklists
// POST: /users/:userId/booklists create booklist
// GET: /users/:userId/booklists/:id list booklist
// PUT: /users/:userId/booklists/:id update booklist

export default router;
