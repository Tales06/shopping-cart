import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register-module-page.component.html',
  styleUrls: ['./register-module-page.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class RegisterModulePageComponent {
  user = {
    email: '',
    password: ''
  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  onSubmit() {
    this.authService.register(this.user).subscribe({
      next: () => {
      this.snackBar.open('Registrazione completata! Ora puoi effettuare il login.', 'Chiudi', {
        duration: 3000,
        panelClass: ['snackbar-success']
      });
      this.router.navigate(['/login']);
    },
    error: () => {
      this.snackBar.open('Errore durante la registrazione.', 'Chiudi', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
    }
    });
  }
}
