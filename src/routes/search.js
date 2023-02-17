import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const router = Router();

router.use(
  "/search",
  createProxyMiddleware({
    target: "https://openlibrary.org/search.json",
    pathRewrite: { "^/api/search": "" },
    changeOrigin: true,
  })
);

export default router;
