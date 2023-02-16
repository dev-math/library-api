import { Router } from "express";
import userRoutes from "./user";
import authRoutes from "./auth";
import bookRoutes from "./book";
import searchRoutes from "./search";
import bookListRoutes from "./booklist";
import auth from "../middleware/auth";

const router = Router();

router.use("/api", authRoutes);
router.use("/api", bookRoutes);

// ==== authenticated routes below ====
router.use("/api", auth);
router.use("/api", searchRoutes);
router.use("/api", userRoutes);
router.use("/api", bookListRoutes);

export default router;
