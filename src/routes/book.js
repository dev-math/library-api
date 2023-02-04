import { Router } from "express";
import {
  getBook,
  getBooks,
  updateBook,
  createBook,
  deleteBook,
} from "../controller/book";

const router = Router();

router.get("/books", getBooks);
router.get("/books/:bookId", getBook);
router.post("/books", createBook);
router.put("/books/:bookId", updateBook);
router.delete("/books/:bookId", deleteBook);

export default router;
