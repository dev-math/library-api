import { Router } from "express";
import { listUser, deleteUser, updateUser } from "../controller/user";
import { saveBookToUserLibrary, removeUserSavedBook } from "../controller/book";
import { createBooklist, getUserBooklists } from "../controller/booklist";

const router = Router();

router.get("/me", listUser);
router.delete("/me", deleteUser);
router.patch("/me", updateUser);
router.put("/me/books", saveBookToUserLibrary);
router.delete("/me/books", removeUserSavedBook);
router.get("/me/booklists", getUserBooklists);
router.post("/me/booklists", createBooklist);

export default router;
