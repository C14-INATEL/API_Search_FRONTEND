import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({providers: [{ provide: Router, useValue: mockRouter }]});});

  afterEach(() => {localStorage.clear();});

  it('deve permitir a navegação se o usuário estiver logado', () => {
    spyOn(localStorage, 'getItem').and.returnValue('true');

    const result = TestBed.runInInjectionContext(() => {return authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);});

    expect(result).toBeTrue();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('deve bloquear a navegação e redirecionar para /login se NÃO estiver logado', () => {
    spyOn(localStorage, 'getItem').and.returnValue('false');

    const result = TestBed.runInInjectionContext(() => {return authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);});

    expect(result).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

});