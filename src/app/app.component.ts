import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { _ProductService } from './services/product.service';
import { BrowserModule } from '@angular/platform-browser';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [
    CartService,
    _ProductService
  ]
})
export class AppComponent implements OnInit {
  cartItemCount: number = 0;
  isDarkTheme: boolean = false;

  constructor(private cartService: CartService, private themeService: ThemeService) {
    this.isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.length;
    });
    this.isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkTheme = !this.isDarkTheme;
  }
}
