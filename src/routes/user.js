import { Router } from 'express';
import { createUser, checkUser, listUsers } from '../controller/user';

const router = Router();

// GET: /me current user details

router.post('/users', createUser);
router.post('/login', checkUser);

router.get('/users', listUsers); // TODO: remove this route

router.get('/users/:userid', listUsers);
router.delete('/users/:userid');

// DELETE: remove user
// GET: /users/:userId list user
// PUT: /users/:userId update user

// GET: /users/:userId/booklists list booklists
// POST: /users/:userId/booklists create booklist
// GET: /users/:userId/booklists/:id list booklist
// PUT: /users/:userId/booklists/:id update booklist

export default router;
