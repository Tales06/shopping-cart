// src/models/Product.ts
import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  imageUrl: String
});

export const Product = model<IProduct>('Product', productSchema);
