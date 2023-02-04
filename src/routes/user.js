import { Router } from "express";
import {
  listUsers,
  listUser,
  deleteUser,
  updateUser,
} from "../controller/user";
import { createBooklist, getUserBooklists } from "../controller/booklist";

const router = Router();

router.get("/me", listUser);
router.get("/me/booklists", getUserBooklists);

router.get("/users/:userid/booklists", getUserBooklists);
router.post("/users/:userid/booklists", createBooklist);

router.delete("/users/:userid", deleteUser);

router.get("/users/:userid", listUser);
router.get("/users", listUsers); // TODO: remove this route

router.patch("/users/:userid", updateUser);

export default router;
