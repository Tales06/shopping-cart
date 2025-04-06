import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  products = [
    { name: 'Prodotto 1', description: 'Descrizione 1', price: 10 },
    { name: 'Prodotto 2', description: 'Descrizione 2', price: 20 },
    { name: 'Prodotto 3', description: 'Descrizione 3', price: 30 },
  ];

  constructor(private cartService: CartService) { }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    alert('Prodotto aggiunto al carrello!');
  }
}
