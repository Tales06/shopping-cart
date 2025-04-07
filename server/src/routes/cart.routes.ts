import { Router } from 'express';
import { getCart, addToCart, removeFromCart } from '../controllers/cart.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate); // Apply authentication middleware to all routes
router.get('/', getCart); // Get cart
router.post('/add', addToCart); // Add item to cart
router.delete('/remove/:productId', removeFromCart); // Remove item from cart

export default router;
