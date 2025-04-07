import { Request, Response } from 'express';
import { Cart } from '../models/cart';

interface AuthRequest extends Request {
    userId?: string;
}

export const getCart = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const cart = await Cart.findOne({ userId: req.userId }).populate({ path: 'items.productId', model: 'Product' });

        if (!cart) {
            res.status(404).json({ message: 'Carrello non trovato.' });
            return;
        }
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: 'Errore nel recupero del carrello.', error: err });
    }
};

export const addToCart = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        console.log('Request body:', req.body); // Log the request body for debugging
        const { productId, quantity } = req.body;
        console.log('Product ID:', productId); // Log the product ID for debugging
        console.log('Quantity:', quantity); // Log the quantity for debugging
        if (!productId || !quantity) {
            res.status(400).json({ message: 'ID prodotto e quantità sono richiesti.' });
            return;
        }
        let cart = await Cart.findOne({ userId: req.userId });
        console.log('Cart found:', cart); // Log the found cart for debugging
        if (!cart) {
            cart = new Cart({ userId: req.userId, items: [] });
        }
        console.log('Cart before update:', cart); // Log the cart before updating for debugging
        const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (productIndex > -1) {
            cart.items[productIndex].quantity += quantity; // Se il prodotto è già nel carrello, aggiorna la quantità
        } else {
            cart.items.push({ productId: productId, quantity });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: 'Errore nell aggiunta al carrello.', error: err });
    }
};

export const removeFromCart = async (req: AuthRequest, res: Response): Promise<void> => {
    const { productId } = req.params;
    try {
        const cart = await Cart.findOne({ userId: req.userId });
        if (!cart) {
            res.status(404).json({ message: 'Carrello non trovato.' });
            return;
        }

        cart.items = cart.items.filter(item => item.productId._id.toString() !== productId);
        await cart.save();

        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: 'Errore nella rimozione dal carrello.', error: err });
    }
};
