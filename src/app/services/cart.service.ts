// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product.service';
import { HttpClient } from '@angular/common/http';
import { CartItemInterface } from '../interfaces/CartItemInterface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `http://localhost:5000/api/cart/add`;
  private cartItems: CartItemInterface[] = [];
  private cartItemsSubject: BehaviorSubject<CartItemInterface[]> = new BehaviorSubject<CartItemInterface[]>(this.cartItems);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private http: HttpClient) {}

  addToCart(product: Product): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { productId: product._id, quantity: product.quantity || 1 });
  }



  getCart(): Observable<any> {
    return this.http.get(this.apiUrl.replace('/add', ''));
  }
  removeFromCart(productId: string): Observable<any> {
    console.log('Rimozione prodotto con ID:', productId);
    return this.http.delete(`${this.apiUrl.replace('/add', '/remove')}/${productId}`);
  }

  clearCart(): Observable<any> {
    return this.http.delete(this.apiUrl);
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.productId.price, 0);
  }

}

