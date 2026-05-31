import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../core/UserService/userService';
import { userInterface } from '../../core/UserService/userInterface';
import { FormsModule } from '@angular/forms';
import { Alert } from '../alert/alert/alert';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [Alert, CommonModule, RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  isLoading: boolean = false;
  showAlert = false;
  alertMessage = '';
  alertTitle = '';
  alertType: 'success' | 'error' | 'warning' = 'success'; 

  mostrarSenha: boolean = false;

  user: userInterface = {
    email: '',
    password: '',
    name: ''
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  toggleSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  save(): void {
    this.isLoading = true;
    this.userService.saveUser(this.user).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.alertTitle = 'Sucesso';
        this.alertMessage = 'Usuário cadastrado com sucesso!';
        this.alertType = 'success'; 
        this.showAlert = true;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.isLoading = false;
        this.alertTitle = 'Erro';
        this.alertMessage = 'Não foi possível cadastrar. Tente novamente.';
        this.alertType = 'error'; 
        this.showAlert = true;
        this.cdr.detectChanges();
      }
    });
  }

  onAlertClose() {
    this.showAlert = false;
    if (this.alertType === 'success') { 
      this.router.navigate(['/login']);
    }
  }
}