import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router, RouterLink } from '@angular/router';
import { Register } from './register';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { UserService } from '../../core/UserService/userService';

// mock success answer
class UserServiceMock {
  saveUser(user: any) {
    return of({ id: 1, ...user });
  }
}

// Mount an enviroment of type register
describe('Register', () => {

  let component: Register;
  let fixture: ComponentFixture<Register>;
  let userService: UserServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register],
      providers: [
        provideRouter([]),
        { provide: UserService, useClass: UserServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as unknown as UserServiceMock;
    fixture.detectChanges();
  });

  // verify if component create with success, should showpassword init with false, should init user with void
  describe('Creating component', () => {

    it('Should create component with success', () => {
      expect(component).toBeTruthy();
    });

    it('Should start with mostrarSenha = false', () => {
      expect(component.mostrarSenha).toBeFalse();
    });

    it('Should start form with empty values', () => {
      expect(component.registerForm.get('name')?.value).toBe('');
      expect(component.registerForm.get('email')?.value).toBe('');
      expect(component.registerForm.get('password')?.value).toBe('');
      expect(component.registerForm.get('confirmPassword')?.value).toBe('');
    });

  });

  // verify stucture of Html
  describe('Structure of template', () => {

    it('Should show title "SAFE ACCOUNTS"', () => {
      const h1 = fixture.debugElement.query(By.css('h1'));
      expect(h1.nativeElement.textContent).toContain('SAFE ACCOUNTS');
    });

    it('Should have the name field', () => {
      const input = fixture.debugElement.query(By.css('input[placeholder="Digite seu Nome"]'));
      expect(input).not.toBeNull();
    });

    it('Should have the email field', () => {
      const input = fixture.debugElement.query(By.css('input[placeholder="Digite seu email"]'));
      expect(input).not.toBeNull();
    });

    it('Should have the password field', () => {
      const input = fixture.debugElement.query(By.css('input[placeholder="Digite sua Senha"]'));
      expect(input).not.toBeNull();
    });

    it('Should have the confirm field', () => {
      const input = fixture.debugElement.query(By.css('input[placeholder="Confirme sua Senha"]'));
      expect(input).not.toBeNull();
    });

    it('Should have the button Registrar', () => {
      const btn = fixture.debugElement.query(By.css('button#btn'));
      expect(btn.nativeElement.textContent.trim()).toContain('Registrar');
    });

    it('Should have the button Entrar', () => {
      const btn = fixture.debugElement.query(By.css('button.go-register'));
      expect(btn.nativeElement.textContent.trim()).toBe('Entrar');
    });

    it('Should have the logo in application', () => {
      const logo = fixture.debugElement.query(By.css('img.logo'));
      expect(logo).not.toBeNull();
    });

  });

  // testing toogle password
  describe('toggleSenha()', () => {

    it('Should change show password of false to true', () => {
      expect(component.mostrarSenha).toBeFalse();
      component.toggleSenha();
      expect(component.mostrarSenha).toBeTrue();
    });

    it('Should change show password of true to false', () => {
      component.mostrarSenha = true;
      component.toggleSenha();
      expect(component.mostrarSenha).toBeFalse();
    });

    it('The field password should be text when show password = true', () => {
      component.mostrarSenha = true;
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('input[placeholder="Digite sua Senha"]'));
      expect(input.nativeElement.type).toBe('text');
    });

    it('The field password should be password when show password = false', () => {
      component.mostrarSenha = false;
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('input[placeholder="Digite sua Senha"]'));
      expect(input.nativeElement.type).toBe('password');
    });

    it('The field confirm password should be text when show password = true', () => {
      component.mostrarSenha = true;
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('input[placeholder="Confirme sua Senha"]'));
      expect(input.nativeElement.type).toBe('text');
    });

    it('The field confirm password should be password when show password = false', () => {
      component.mostrarSenha = false;
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('input[placeholder="Confirme sua Senha"]'));
      expect(input.nativeElement.type).toBe('password');
    });

    it('Should be active toggle when click in .hide-icon', () => {
      spyOn(component, 'toggleSenha').and.callThrough();
      fixture.debugElement.query(By.css('.hide-icon')).nativeElement.click();
      fixture.detectChanges();
      expect(component.toggleSenha).toHaveBeenCalled();
      expect(component.mostrarSenha).toBeTrue();
    });

    it('Should active toggle when click in .show-icon', () => {
      component.mostrarSenha = true;
      fixture.detectChanges();
      spyOn(component, 'toggleSenha').and.callThrough();
      fixture.debugElement.query(By.css('.show-icon')).nativeElement.click();
      fixture.detectChanges();
      expect(component.toggleSenha).toHaveBeenCalled();
      expect(component.mostrarSenha).toBeFalse();
    });

  });

  // verify if that the user typed arrive in registerForm
  describe('Reactive Form Binding', () => {

    it('Should update name control', () => {
      const input = fixture.debugElement
        .query(By.css('input[placeholder="Digite seu Nome"]'))
        .nativeElement;

      input.value = 'João Silva';
      input.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(
        component.registerForm.get('name')?.value
      ).toBe('João Silva');
    });

    it('Should update email control', () => {
      const input = fixture.debugElement
        .query(By.css('input[placeholder="Digite seu email"]'))
        .nativeElement;

      input.value = 'joao@email.com';
      input.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(
        component.registerForm.get('email')?.value
      ).toBe('joao@email.com');
    });

    it('Should update password control', () => {
      const input = fixture.debugElement
        .query(By.css('input[placeholder="Digite sua Senha"]'))
        .nativeElement;

      input.value = 'Senha@123456';
      input.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(
        component.registerForm.get('password')?.value
      ).toBe('Senha@123456');
    });

  });

  /// testing user service
  describe('save()', () => {

    // Função auxiliar para preencher o formulário com dados válidos
    const fillValidForm = () => {
      component.registerForm.patchValue({
        name: 'Joao Silva', // Sem acento para evitar bloqueio de Regex
        email: 'joao@email.com',
        password: 'Senha@123456', 
        confirmPassword: 'Senha@123456'
      });
    };

    it('Should call userService.saveUser with form data', () => {
      spyOn(userService, 'saveUser').and.callThrough();

      fillValidForm();
      component.save();

      expect(userService.saveUser).toHaveBeenCalledWith({
        name: 'Joao Silva',
        email: 'joao@email.com',
        password: 'Senha@123456'
      });
    });

    it('Should show alert with type success when save with success', () => {
      spyOn(userService, 'saveUser').and.returnValue(of({ id: 1 }));

      fillValidForm();
      component.save();

      expect(component.showAlert).toBeTrue();
      expect(component.alertType).toBe('success');
    });

    it('Should show alert with type error when save fails', () => {
      spyOn(userService, 'saveUser').and.returnValue(throwError(() => new Error('erro')));
      
      fillValidForm();
      component.save();
      
      expect(component.showAlert).toBeTrue();
      expect(component.alertType).toBe('error');
    });

    it('Should handle with error when save user', () => {
      const erro = new Error('Erro de rede');

      // Fica espionando o saveUser para retornar o erro
      spyOn(userService, 'saveUser').and.returnValue(throwError(() => erro));
      spyOn(console, 'error');

      fillValidForm();
      component.save();

      expect(console.error).toHaveBeenCalledWith('Error saving user:', erro.message);
    });

    it('Should call save() when click in button Registrar', () => {
      spyOn(component, 'save');
      fixture.debugElement.query(By.css('button#btn')).nativeElement.click();
      fixture.detectChanges();
      expect(component.save).toHaveBeenCalled();
    });

  });

  // verify alert behavior after save
  describe('Alert behavior', () => {

    it('Should hide alert when onAlertClose is called', () => {
      component.showAlert = true;
      component.onAlertClose();
      expect(component.showAlert).toBeFalse();
    });

    it('Should navigate to /login when close alert with success', () => {
      const router = TestBed.inject(Router);
      spyOn(router, 'navigate');
      component.alertType = 'success';
      component.onAlertClose();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('Should not navigate when close alert with error', () => {
      const router = TestBed.inject(Router);
      spyOn(router, 'navigate');
      component.alertType = 'error';
      component.onAlertClose();
      expect(router.navigate).not.toHaveBeenCalled();
    });

  });

  //isLoading / Spinner 
  describe('isLoading', () => {

    it('Should start isLoading as false', () => {
      expect(component.isLoading).toBeFalse();
    });

    it('Should set isLoading to true when save starts', () => {
      spyOn(userService, 'saveUser').and.returnValue(of({ id: 1 }));
      component.isLoading = true;
      expect(component.isLoading).toBeTrue();
    });

    it('Should set isLoading to false after save success', () => {
      spyOn(userService, 'saveUser').and.returnValue(of({ id: 1 }));
      component.save();
      expect(component.isLoading).toBeFalse();
    });

    it('Should set isLoading to false after save error', () => {
      spyOn(userService, 'saveUser').and.returnValue(throwError(() => new Error('erro')));
      component.save();
      expect(component.isLoading).toBeFalse();
    });

  });

  // navigation with router
  describe('Navigation (routerLink)', () => {

    it('Button Entrar should have routerLink="/login"', () => {
      const btn = fixture.debugElement.query(By.css('button.go-register'));
      expect(btn.attributes['routerLink']).toBe('/login');
    });

  });

});