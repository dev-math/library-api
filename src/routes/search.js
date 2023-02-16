import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const router = Router();

router.use('/search', createProxyMiddleware({
  target: 'https://www.googleapis.com/books/v1/volumes'
}));

export default router;
