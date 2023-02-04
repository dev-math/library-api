import { Router } from "express";
import { } from "../controller/booklist";

const router = Router();

router.get("/booklists/:booklistId"); // get playlist details
router.put("/booklists/:booklistId"); // change playlist name
router.get("/booklists/:booklistId/books"); // get books
router.post("/booklists/:booklistId/books"); // add book
router.delete("/booklists/:booklistId/books"); // remove book

export default router;
