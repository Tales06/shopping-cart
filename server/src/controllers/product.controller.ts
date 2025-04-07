// src/controllers/product.controller.ts
import { Request, Response } from 'express';
import { Product } from '../models/product';


export const getAllProducts = async (_req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Errore nel recupero prodotti.', error: err });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    const { name, description, price, imageUrl } = req.body;


    try {
        const newProduct = await Product.create({ name, description, price, imageUrl });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ message: 'Errore nella creazione del prodotto.', error: err });
    }
};
