import { Component, OnInit } from '@angular/core';
import { _ProductService, Product } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ]
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: _ProductService, private cartService: CartService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  addToCart(product: Product): void {
    const token = localStorage.getItem("token");

    if (!token) {
      this.snackBar.open('Effettua il login per aggiungere prodotti al carrello.', 'Chiudi', {
        duration: 3000,
        panelClass: ['snackbar-warning']
      });
      return;
    }

    this.cartService.addToCart(product).subscribe({
      next: () => {
        console.log('Prodotto aggiunto al carrello:', product);
        this.snackBar.open('Prodotto aggiunto al carrello!', 'Chiudi', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      },
      error: (err) => {
        console.error('Errore durante l\'aggiunta al carrello:', err);
        this.snackBar.open('Errore. Prova ad accedere di nuovo.', 'Chiudi', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }

    });
  }
}
