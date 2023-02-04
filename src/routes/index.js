import { Router } from "express";
import userRoutes from "./user";
import authRoutes from "./auth";
import bookRoutes from "./book";
import auth from "../middleware/auth";

const router = Router();

router.use("/api", authRoutes);
router.use("/api", bookRoutes);

// ==== authenticated routes below ====
router.use("/api", auth);
router.use("/api", userRoutes);

export default router;
