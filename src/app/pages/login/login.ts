import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Alert } from '../alert/alert/alert';
import { UserService } from '../../core/UserService/userService';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, Alert],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  mostrarSenha: boolean = false;
  isLoading: boolean = false;
  showAlert: boolean = false;
  alertMessage: string = '';
  alertTitle: string = '';
  alertType: 'success' | 'error' | 'warning' = 'success';

  credentials = { email: '', password: '' };

  constructor(
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  toggleSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  login(): void {
    this.isLoading = true;
    this.userService.login(this.credentials.email, this.credentials.password).subscribe({
      next: (userId: number) => {
        this.isLoading = false;
        localStorage.setItem('userId', userId.toString());
        this.router.navigate(['/central-emails']);
      },
      error: () => {
        this.isLoading = false;
        this.alertTitle = 'Erro';
        this.alertMessage = 'Email ou senha incorretos.';
        this.alertType = 'error';
        this.showAlert = true;
        this.cdr.detectChanges();
      }
    });
  }

  onAlertClose() {
    this.showAlert = false;
  }
}