import { Router } from "express";
import {
  createProxyMiddleware,
  responseInterceptor,
} from "http-proxy-middleware";
import { isBookOnUserLibrary } from "../controller/book";

const router = Router();

router.get(
  "/search",
  createProxyMiddleware({
    target: "https://openlibrary.org/search.json",
    pathRewrite: { "^/api/search": "" },
    changeOrigin: true,
    selfHandleResponse: true, // res.end() will be called internally by responseInterceptor()
    onProxyRes: responseInterceptor(async (responseBuffer, _proxyRes, req) => {
      const { docs: books } = JSON.parse(responseBuffer.toString("utf8"));

      for (let index = 0; index < books.length; index++) {
        const {
          title,
          key,
          number_of_pages_median: pages,
          cover_i,
        } = books[index];
        books[index] = {
          saved: await isBookOnUserLibrary(req.userId, key),
          title,
          key,
          pages,
          cover_i,
        };
      }
      return JSON.stringify({ books });
    }),
  })
);

export default router;
