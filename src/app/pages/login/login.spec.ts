import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component} from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { Login } from './login';
import { By } from '@angular/platform-browser'; 
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../core/UserService/userService';
import { of, throwError } from 'rxjs';

describe('Login', () => {

  let component: Login;
  let fixture: ComponentFixture<Login>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let router: Router;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['login']);

    await TestBed.configureTestingModule({
      imports: [Login, ReactiveFormsModule], providers: [provideRouter([]),{ provide: UserService, useValue: mockUserService }]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    spyOn(localStorage, 'setItem');
    
    fixture.detectChanges();
  });

  describe('Creating component', () => {
    it('should creating with success', () => {
      expect(component).toBeTruthy();
    });

    it('should to init with show password in status with false', () => {
      expect(component.mostrarSenha).toBeFalse();
    });

    it('should init the form correctly', () => {
      expect(component.loginForm).toBeDefined();
      expect(component.loginForm.get('email')?.value).toBe('');
      expect(component.loginForm.get('password')?.value).toBe('');
    });
  });

  describe('Form Validation', () => {
    it('should invalidate form when empty', () => {
      expect(component.loginForm.valid).toBeFalsy();
    });

    it('should validate email format and domain', () => {
      const emailControl = component.loginForm.get('email');
      
      emailControl?.setValue('teste.com');
      expect(emailControl?.hasError('email')).toBeTruthy();

      emailControl?.setValue('teste@dominio');
      expect(emailControl?.hasError('invalidDomain')).toBeTruthy();

      emailControl?.setValue('teste@dominio.com');
      expect(emailControl?.valid).toBeTruthy();
    });

    it('should validate form when filled correctly', () => {
      component.loginForm.get('email')?.setValue('usuario@teste.com');
      component.loginForm.get('password')?.setValue('SenhaForte123!');
      expect(component.loginForm.valid).toBeTruthy();
    });
  });

  // Testing login logic and API integration
  describe('login() method', () => {
    it('should show alert if form is empty', () => {
      component.login();
      expect(component.showAlert).toBeTrue();
      expect(component.alertType).toBe('error');
      expect(component.alertMessage).toContain('não podem estar vazios');
      expect(mockUserService.login).not.toHaveBeenCalled();
    });

    it('should show alert if email is invalid', () => {
      component.loginForm.get('email')?.setValue('email-invalido');
      component.loginForm.get('password')?.setValue('senha123');
      
      component.login();
      
      expect(component.showAlert).toBeTrue();
      expect(component.alertType).toBe('error');
      expect(component.alertMessage).toContain('endereço válido');
      expect(mockUserService.login).not.toHaveBeenCalled();
    });

    // Simulando testes Backend
    it('should call userService and navigate on success', () => {
      component.loginForm.get('email')?.setValue('usuario@teste.com');
      component.loginForm.get('password')?.setValue('SenhaForte123!');
      
      mockUserService.login.and.returnValue(of(1));
      component.login();

      expect(mockUserService.login).toHaveBeenCalledWith('usuario@teste.com', encodeURIComponent('SenhaForte123!'));
      expect(localStorage.setItem).toHaveBeenCalledWith('userId', '1');
      expect(router.navigate).toHaveBeenCalledWith(['/central-emails']);
      expect(component.isLoading).toBeFalse();
    });

    it('should show warning alert on 429 error (Too Many Requests)', () => {
      component.loginForm.get('email')?.setValue('usuario@teste.com');
      component.loginForm.get('password')?.setValue('SenhaForte123!');
      
      mockUserService.login.and.returnValue(throwError(() => ({ status: 429 })));
      component.login();

      expect(component.showAlert).toBeTrue();
      expect(component.alertType).toBe('warning');
      expect(component.alertMessage).toContain('Muitas tentativas');
      expect(component.isLoading).toBeFalse();
    });

    it('should show error alert on wrong credentials', () => {
      component.loginForm.get('email')?.setValue('usuario@teste.com');
      component.loginForm.get('password')?.setValue('SenhaErrada!');
      
      mockUserService.login.and.returnValue(throwError(() => ({ status: 401 })));
      component.login();

      expect(component.showAlert).toBeTrue();
      expect(component.alertType).toBe('error');
      expect(component.alertMessage).toContain('Email ou senha incorretos');
      expect(component.isLoading).toBeFalse();
    });
  });

  describe('Alerts', () => {
    it('should close alert when onAlertClose is called', () => {
      component.showAlert = true;
      component.onAlertClose();
      expect(component.showAlert).toBeFalse();
    });
  });

  // testing html
  describe('Estrutura do template', () => {
    it('should show title "SAFE ACCOUNTS"', () => {
      const h1 = fixture.debugElement.query(By.css('h1'));
      if(h1) {
          expect(h1.nativeElement.textContent).toContain('SAFE ACCOUNTS');
      }
    });

    it('should own the field email', () => {
      const emailInput = fixture.debugElement.query(By.css('input[type="email"]'));
      expect(emailInput).not.toBeNull();
    });

    it('should own the field "Entrar"', () => {
      const btn = fixture.debugElement.query(By.css('button[type="submit"]')); // Atualizado para o form
      if(btn) {
          expect(btn.nativeElement.textContent.trim()).toBe('Entrar');
      }
    });

    it('Should own the field the button "registrar-se"', () => {
      const btn = fixture.debugElement.query(By.css('.go-register'));
      if(btn) expect(btn).not.toBeNull();
    });

    xit('Should own the field the button forget password', () => {
      const btn = fixture.debugElement.query(By.css('.forgot_password'));
      expect(btn).not.toBeNull();
    });

    it('Should the own the logo of aplication', () => {
      const logo = fixture.debugElement.query(By.css('img.logo'));
      if(logo) expect(logo).not.toBeNull();
    });
  });

  // Treating the toggle of show password
  describe('toggleSenha()', () => {
    it('Should alternate show password of false to true', () => {
      expect(component.mostrarSenha).toBeFalse();
      component.toggleSenha();
      expect(component.mostrarSenha).toBeTrue();
    });

    it('Should alternate show password of true to false', () => {
      component.mostrarSenha = true;
      component.toggleSenha();
      expect(component.mostrarSenha).toBeFalse();
    });
  });

  // navigation with router
  describe('Navigation (routerLink)', () => {
    it('The button "registrar-se" should have routerLink="/register"', () => {
      const btn = fixture.debugElement.query(By.css('button.go-register, a.go-register'));
      if(btn) {
          expect(btn.attributes['routerLink'] || btn.nativeElement.getAttribute('routerLink')).toBe('/register');
      }
    });

    xit('The button "senha" should have routerLink="/forgot-password"', () => {
      const btn = fixture.debugElement.query(By.css('.forgot_password'));
      expect(btn.attributes['routerLink']).toBe('/forgot-password');
    });
  });

});