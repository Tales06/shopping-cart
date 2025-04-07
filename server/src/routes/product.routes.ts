// src/routes/product.routes.ts
import { Router } from 'express';
import { getAllProducts, createProduct } from '../controllers/product.controller';

const router = Router();

router.get('/', getAllProducts);
router.post('/create', createProduct);

export default router;
