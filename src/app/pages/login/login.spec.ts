import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Login } from './login';
import { By } from '@angular/platform-browser'; 

// setting mock navigation in web without need to use true
describe('Login', () => {

  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [Login],
    providers: [provideRouter([])]
  }).compileComponents();

  fixture = TestBed.createComponent(Login);
  component = fixture.componentInstance;
  fixture.detectChanges();
  });

  // test of creating component and verify if the component is init with correct value, in this this case password hide password
  describe('Creating component ', () => {

  it('should creating with success', () => {
    expect(component).toBeTruthy();
  });

  it('should to init with show password in status with false', () => {
    expect(component.mostrarSenha).toBeFalse();
  });

  });

  // testing html 
  describe('Estrutura do template', () => {

    it('should show title "API SEARCH"', () => {
      const h1 = fixture.debugElement.query(By.css('h1'));
      expect(h1.nativeElement.textContent).toContain('API SEARCH');
    });

    it('should own the field email', () => {
      const emailInput = fixture.debugElement.query(By.css('input[type="email"]'));
      expect(emailInput).not.toBeNull();
    });

    it('should own the field "password"', () => {
      const senhaInput = fixture.debugElement.query(By.css('input[placeholder="Digite sua Senha"]'));
      expect(senhaInput.nativeElement.type).toBe('password');
    });

    it('should own the field "Entrar"', () => {
      const btn = fixture.debugElement.query(By.css('button.login'));
      expect(btn.nativeElement.textContent.trim()).toBe('Entrar');
    });

    it('Should own the field the button "registrar-se"', () => {
      const btn = fixture.debugElement.query(By.css('button.go-register'));
      expect(btn).not.toBeNull();
    });

    it('Should own the field the button forget password', () => {
      const btn = fixture.debugElement.query(By.css('button.forgot_password'));
      expect(btn).not.toBeNull();
    });

    it('Should the own the logo of aplication', () => {
      const logo = fixture.debugElement.query(By.css('img.logo'));
      expect(logo).not.toBeNull();
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

    it('Should display the .show-icon and hide the .hide-icon when showPassword = true.', () => {
      component.mostrarSenha = true;
      fixture.detectChanges(); 

      expect(fixture.debugElement.query(By.css('.show-icon'))).not.toBeNull();
      expect(fixture.debugElement.query(By.css('.hide-icon'))).toBeNull();
    });

    it('Should display the .show-icon and hide the .hide-icon when showPassword = false', () => {
      component.mostrarSenha = false;
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.hide-icon'))).not.toBeNull();
      expect(fixture.debugElement.query(By.css('.show-icon'))).toBeNull();
    });

    it('Should display to change the kind of type input to text when show password = true', () => {
      component.mostrarSenha = true;
      fixture.detectChanges();

      const senhaInput = fixture.debugElement.query(By.css('input[placeholder="Digite sua Senha"]'));
      expect(senhaInput.nativeElement.type).toBe('text');
    });

    it('Should to back the kind type input to password when show password = false', () => {
      component.mostrarSenha = true;
      fixture.detectChanges();
      component.mostrarSenha = false;
      fixture.detectChanges();

      const senhaInput = fixture.debugElement.query(By.css('input[placeholder="Digite sua Senha"]'));
      expect(senhaInput.nativeElement.type).toBe('password');
    });

    it('Should to call toggleSenha() and to change when click in .hide-icon', () => {
      spyOn(component, 'toggleSenha').and.callThrough();

      fixture.debugElement.query(By.css('.hide-icon')).nativeElement.click();
      fixture.detectChanges();

      expect(component.toggleSenha).toHaveBeenCalled();
      expect(component.mostrarSenha).toBeTrue();
    });

    it('Should to call toggleSenha() and to change the state the click in .show-icon', () => {
      component.mostrarSenha = true;
      fixture.detectChanges();

      spyOn(component, 'toggleSenha').and.callThrough();

      fixture.debugElement.query(By.css('.show-icon')).nativeElement.click();
      fixture.detectChanges();

      expect(component.toggleSenha).toHaveBeenCalled();
      expect(component.mostrarSenha).toBeFalse();
    });

  });

  // navigation with router
  describe('Navigation (routerLink)', () => {

    it('The button "Entrar" should have routerLink="/login"', () => {
      const btn = fixture.debugElement.query(By.css('button.login'));
      expect(btn.attributes['routerLink']).toBe('/login');
    });

    it('The button "registrar-se" should have routerLink="/register"', () => {
      const btn = fixture.debugElement.query(By.css('button.go-register'));
      expect(btn.attributes['routerLink']).toBe('/register');
    });

    it('The button "senha" should have routerLink="/forgot-password"', () => {
      const btn = fixture.debugElement.query(By.css('button.forgot_password'));
      expect(btn.attributes['routerLink']).toBe('/forgot-password');
    });

  });

});