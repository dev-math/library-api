import { Router } from 'express';
import { createUser, checkUser, listUsers } from '../controller/user';

const router = Router();

// GET: /me current user details

router.post('/', createUser);
router.post('/login', checkUser);

router.get('/', listUsers); // TODO: remove this route

// DELETE: remove user
// GET: /users/:userId list user
// PUT: /users/:userId update user

// GET: /users/:userId/booklists list booklists
// POST: /users/:userId/booklists create booklist
// GET: /users/:userId/booklists/:id list booklist
// PUT: /users/:userId/booklists/:id update booklist

export default router;
