import { Product } from "../services/product.service";

export interface CartItemInterface {
    productId: Product;
    quantity: number;
    _id: string;
}