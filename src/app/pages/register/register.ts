import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../../core/UserService/userService';
import { userInterface } from '../../core/UserService/userInterface';
import { Alert } from '../alert/alert/alert';

// Funções que validam os campos do formulário

// Verifica se o campo nome tem no mínimo 5 caracteres e se tem apenas letras e espaços

function strictNameValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;

  if (value.trim().length < 5) {
    return { nameTooShort: true };
  }
  const hasOnlyLetters = /^[a-zA-Z\s]+$/.test(value);
  
  if (!hasOnlyLetters) {
    return { invalidNameChars: true };
  }
  return null;
}

// Verifica se o formato é de um email real: texto + @ + dominio + . + extensao (ex: .com, .br).
function allowedDomainsValidator(control: AbstractControl): ValidationErrors | null {
  const email = control.value;
  if (!email) return null;
  const isValidDomain = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  
  return !isValidDomain ? { invalidDomain: true } : null;
}

// Verifica se a senha tem no mínimo 12 caracteres, pelo menos 1 letra maiúscula, 1 número e 1 símbolo
function passwordComplexityValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;

  const hasMinLength = value.length >= 12;
  const hasUpperCase = /[A-Z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSymbol = /[\/-_!@#$%^&*(),.?":{}|<>]/.test(value);

  const isValid = hasMinLength && hasUpperCase && hasNumber && hasSymbol;
  return !isValid ? { passwordComplexity: true } : null;
}

// Verifica se as senhas batem
function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { mismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [Alert, CommonModule, RouterLink, ReactiveFormsModule], 
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  isLoading: boolean = false;
  showAlert = false;
  alertMessage = '';
  alertTitle = '';
  alertType: 'success' | 'error' | 'warning' = 'success';
  alreadyRegistered: boolean = false;
  mostrarSenha: boolean = false;

  // Variáveis para controle do timer
  private timeoutId: any;
  private readonly REGISTRATION_TIMEOUT_KEY = 'registrationExpirationTime';
  private readonly TIMEOUT_DURATION = 5 * 60 * 1000; // 5 minutos em milissegundos

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, strictNameValidator]],
      email: ['', [Validators.required, Validators.email, allowedDomainsValidator]],
      password: ['', [Validators.required, passwordComplexityValidator]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: passwordMatchValidator });

    // Assim que a página carrega, verifica se o timer ainda está rodando
    this.checkRegistrationTimeout(); 
  }

  ngOnDestroy(): void {
    // Limpa o timer se o componente for destruído (ex: usuário mudou de rota)
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  get f() { return this.registerForm.controls; }

  toggleSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  // Conrolador do Timer
  private checkRegistrationTimeout(): void {
    const expirationStr = localStorage.getItem(this.REGISTRATION_TIMEOUT_KEY);
    
    if (expirationStr) {
      const expirationTime = parseInt(expirationStr, 10);
      const currentTime = Date.now();

      if (currentTime >= expirationTime) {
        // Cenário: O usuário atualizou a página e os 5 minutos JÁ PASSARAM
        console.log('O tempo acabou, você pode fazer uma nova requisição.');
        
        this.clearRegistrationState();
      } else {
        // Cenário: O usuário atualizou a página e AINDA ESTÁ dentro dos 5 minutos
        console.log('Espere 5 minutos para fazer uma nova requisição.');
        
        this.alreadyRegistered = true;
        const remainingTime = expirationTime - currentTime;
        this.startTimer(remainingTime);
      }
    }
  }

  private setRegistrationTimeout(): void {
    this.alreadyRegistered = true;
    const expirationTime = Date.now() + this.TIMEOUT_DURATION;
    
    localStorage.setItem(this.REGISTRATION_TIMEOUT_KEY, expirationTime.toString());
    
    // Cenário: O usuário ACABOU de fazer o cadastro com sucesso
    console.log('Espere 5 minutos para fazer uma nova requisição.');
    
    this.startTimer(this.TIMEOUT_DURATION);
  }

  private startTimer(duration: number): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    
    this.timeoutId = setTimeout(() => {
      // Cenário: O usuário ficou na página esperando os 5 minutos passarem
      console.log('O tempo acabou, você pode fazer uma nova requisição.');
      
      this.clearRegistrationState();
      this.cdr.detectChanges(); 
    }, duration);
  }

  private clearRegistrationState(): void {
    this.alreadyRegistered = false;
    localStorage.removeItem(this.REGISTRATION_TIMEOUT_KEY);
  }

  // --- FINAL DO CONTROLE DO TIMER ---

  save(): void {
    if (this.registerForm.invalid) {
      const controls = this.registerForm.controls;

      this.alertTitle = 'Atenção';
      this.alertType = 'error'; 

      if (controls['name'].hasError('required') || 
          controls['email'].hasError('required') || 
          controls['password'].hasError('required') || 
          controls['confirmPassword'].hasError('required')) {
        
        console.error('Error: All fields are required.');
        this.alertTitle = 'Erro de Formulário';
        this.alertMessage = 'Não foi possível realizar, alguns campos estão vazios.';
        this.alertType = 'error'; 
        this.showAlert = true;
        this.cdr.detectChanges();

      } else if (controls['name'].hasError('nameTooShort')) {
        
        console.error('Error: Name too short.');
        this.alertTitle = 'Erro de Formulário';
        this.alertMessage = 'O nome deve ter no mínimo 5 caracteres.';
        this.alertType = 'error'; 
        this.showAlert = true;
        this.cdr.detectChanges();

      } else if (controls['name'].hasError('invalidNameChars')) {
        
        console.error('Error: Invalid Name.');
        this.alertTitle = 'Erro de Formulário';
        this.alertMessage = 'O nome não pode conter números ou símbolos. Use apenas letras.';
        this.alertType = 'error'; 
        this.showAlert = true;
        this.cdr.detectChanges();

      } else if (controls['email'].hasError('email') || controls['email'].hasError('invalidDomain')) {
        
        console.error('Error: The email must be valid.');
        this.alertTitle = 'Erro de Formulário';
        this.alertMessage = 'O Email deve conter um endereço válido.';
        this.alertType = 'error'; 
        this.showAlert = true;
        this.cdr.detectChanges();

      } else if (controls['password'].hasError('passwordComplexity')) {

        console.error('Error: Password fields must meet the requirements: 12 characters, 1 uppercase letter, 1 number and 1 symbol.');
        this.alertTitle = 'Erro de Formulário';
        this.alertMessage = 'A senha deve conter no mínimo 12 caracteres, 1 letra maiúscula, 1 número e um símbolo.';
        this.alertType = 'error'; 
        this.showAlert = true;
        this.cdr.detectChanges();

      } else if (this.registerForm.hasError('mismatch')) {
        
        console.error('Error: Passwords do not match.');
        this.alertTitle = 'Erro de Formulário';
        this.alertMessage = 'As senhas não coincidem.';
        this.alertType = 'error'; 
        this.showAlert = true;
        this.cdr.detectChanges();
      }
    
      this.showAlert = true;
      this.cdr.detectChanges();
      return;
    }

    this.isLoading = true;
    
    const userData: userInterface = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    this.userService.saveUser(userData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.alertTitle = 'Sucesso';
        this.alertMessage = 'Usuário cadastrado com sucesso!';
        this.alertType = 'success'; 
        this.showAlert = true;
        this.setRegistrationTimeout(); 
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error saving user:', error.message);
        this.alertTitle = 'Erro no Servidor';
        this.alertMessage = 'Não foi possível realizar seu cadastro no momento.';
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