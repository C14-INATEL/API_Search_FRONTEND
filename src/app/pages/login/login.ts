import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Alert } from '../alert/alert/alert';
import { UserService } from '../../core/UserService/userService';

function allowedDomainsValidator(control: AbstractControl): ValidationErrors | null {
  const email = control.value;
  if (!email) return null;
  const isValidDomain = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  
  return !isValidDomain ? { invalidDomain: true } : null;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, Alert],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  mostrarSenha: boolean = false;
  isLoading: boolean = false;
  showAlert: boolean = false;
  alertMessage: string = '';
  alertTitle: string = '';
  alertType: 'success' | 'error' | 'warning' = 'success';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, allowedDomainsValidator]],
      password: ['', [Validators.required]]
    });
  }

  get f() { return this.loginForm.controls; }

  toggleSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  login(): void {
    // Antes de fazer a requisição verifica se o formulário está correto
    if (this.loginForm.invalid) {
      const controls = this.loginForm.controls;

      this.alertTitle = 'Atenção';
      this.alertType = 'error'; 

      if (controls['email'].hasError('required') || controls['password'].hasError('required')) {
        console.error('Error: All fields are required.');
        this.alertTitle = 'Erro de Formulário';
        this.alertMessage = 'Não foi possível realizar o login, os campos de email e senha não podem estar vazios.';
        this.alertType = 'error'; 
        this.showAlert = true;
        this.cdr.detectChanges();
        return;
      } 
      
      if (controls['email'].hasError('email') || controls['email'].hasError('invalidDomain')) {
        console.error('Error: The email must be valid.');
        this.alertTitle = 'Erro de Formulário';
        this.alertMessage = 'O Email deve conter um endereço válido.';
        this.alertType = 'error'; 
        this.showAlert = true;
        this.cdr.detectChanges();
        return;
      }

      this.showAlert = true;
      this.cdr.detectChanges();
      return;
    }

    this.isLoading = true;
    
    const email = this.loginForm.value.email;
    const password = encodeURIComponent(this.loginForm.value.password);

    this.userService.login(email, password).subscribe({
      next: (userId: number) => {
        this.isLoading = false;
        localStorage.setItem('userId', userId.toString());
        this.router.navigate(['/central-emails']);
      },
      error: (err: any) => {
        this.isLoading = false;
        if (err.status === 429) {
          this.alertTitle = 'Atenção';
          this.alertMessage = 'Muitas tentativas. Aguarde alguns segundos.';
          this.alertType = 'warning';
        } else {
          this.alertTitle = 'Erro';
          this.alertMessage = 'Email ou senha incorretos.';
          this.alertType = 'error';
        }
        this.showAlert = true;
        this.cdr.detectChanges();
      }
    });
  }

  onAlertClose() {
    this.showAlert = false;
  }
}