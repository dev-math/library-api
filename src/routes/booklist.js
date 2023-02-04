import { Router } from "express";
import {
  addBooklistItem,
  getBooklist,
  getBooklistItems,
  removeBooklistItem,
  updateBooklist,
} from "../controller/booklist";

const router = Router();

router.get("/booklists/:booklistId", getBooklist);
router.put("/booklists/:booklistId", updateBooklist);
router.get("/booklists/:booklistId/books", getBooklistItems);
router.post("/booklists/:booklistId/books", addBooklistItem);
router.delete("/booklists/:booklistId/books", removeBooklistItem);

export default router;
