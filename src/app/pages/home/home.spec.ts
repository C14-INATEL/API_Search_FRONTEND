import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { Home } from './home';
import { By } from '@angular/platform-browser';

describe('Home', () => {

  let component: Home;
  let fixture: ComponentFixture<Home>;
  let router: Router;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])]
    }).compileComponents();

    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  function getButton(selector: string): HTMLButtonElement {
    const button = fixture.debugElement.query(By.css(selector));

    expect(button).not.toBeNull();

    return button.nativeElement;
  }

  describe('Navigation Buttons', () => {

    it('should navigate to login page', () => {

      const navigateSpy = spyOn(router, 'navigateByUrl');

      getButton('.primary').click();

      expect(navigateSpy).toHaveBeenCalled();
    });

    it('should navigate to register page', () => {

      const navigateSpy = spyOn(router, 'navigateByUrl');

      getButton('.secondary').click();

      expect(navigateSpy).toHaveBeenCalled();
    });

  });

  describe('Support Button', () => {

    it('should open support email', () => {

      const openSpy = spyOn(window, 'open');

      getButton('.support').click();

      expect(openSpy).toHaveBeenCalled();

    });

  });

});