import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartItemInterface } from '../interfaces/CartItemInterface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

  ]
})
export class CartComponent implements OnInit {
  total: number = 0;
  cartItems: CartItemInterface[] = [];


  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.cartItems = res.items;
        console.log('Carrello:', this.cartItems);
        this.calculateTotal();
      },
      error: (err) => console.error(err),
    });
  }

   updateQuantity(item: Product) {
    //TODO
    this.calculateTotal();
  }

  removeFromCart(productId: string): void {
    this.cartService.removeFromCart(productId).subscribe({
      next: () => {
        console.log(productId)
        this.cartItems = this.cartItems.filter(item => item.productId._id !== productId);
        this.calculateTotal();
      },
      error: (err) => console.error(err),
    });
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
    console.log('Totale carrello:', this.total);
  }
}

