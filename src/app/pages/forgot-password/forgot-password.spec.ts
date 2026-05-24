import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { ForgotPassword } from './forgot-password';

describe('ForgotPassword', () => {
  let component: ForgotPassword;
  let fixture: ComponentFixture<ForgotPassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPassword, RouterTestingModule],providers: [{ provide: ActivatedRoute,useValue: {snapshot: {},params: {},queryParams: {},}}]
    }).compileComponents();fixture = TestBed.createComponent(ForgotPassword);component = fixture.componentInstance;fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});