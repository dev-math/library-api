import { Router } from 'express';
import { listUsers, listUser, deleteUser, updateUser } from '../controller/user';

const router = Router();

router.get('/me', listUser);
router.get('/me/booklists', listUser);

router.get('/users/:userid/booklists'); // get booklist
router.post('/users/:userid/booklists'); // create booklist

router.delete('/users/:userid', deleteUser);

router.get('/users/:userid', listUser);
router.get('/users', listUsers); // TODO: remove this route

router.patch('/users/:userid', updateUser);

export default router;
