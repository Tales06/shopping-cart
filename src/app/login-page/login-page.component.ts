import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LoginPageComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  onSubmit() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
      localStorage.setItem('token', res.token);
      this.snackBar.open('Login effettuato con successo!', 'Chiudi', {
        duration: 3000,
        panelClass: ['snackbar-success']
      });
      this.router.navigate(['/']);
    },
    error: () => {
      this.snackBar.open('Email o password errati.', 'Chiudi', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
    }
    });
  }
}
