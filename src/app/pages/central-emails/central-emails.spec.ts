import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CentralEmails } from './central-emails';
import { AccountService } from '../../core/Account/accountService';
import { provideRouter, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { AccountInterface } from '../../core/Account/accountInterface';
 

const mockEmail: AccountInterface = {
  id: 1,
  emailMonitored: 'test@email.com',
  nameBreaches: 'Canva',
  domain: 'canva.com',
  breachDate: '2019-05-01',
  pwnCount: 137000000,
  verified: true,
  ssensitive: false,
  dataClasses: ['Email addresses', 'Passwords'],
  description: 'Breach description',
  logoPath: 'https://canva.com/logo.png',
  addedDate: '2019-05-24',
  attribution: undefined
};

class AccountServiceMock {
  getByUserId(_userId: number) { return of([mockEmail]); }
  addMonitored(_userId: number, _email: string) { return of('ok'); }
  deleteById(_id: number) { return of(void 0); }
  deleteByEmail(_email: string) { return of(void 0); }
  refreshEmail(_userId: number, _email: string) { return of('ok'); }
  checkPassword(_password: string) { return of('Password leaked 80 time'); }
}

describe('CentralEmails', () => {
  let component: CentralEmails;
  let fixture: ComponentFixture<CentralEmails>;
  let accountService: AccountServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentralEmails],
      providers: [
        provideRouter([]),
        { provide: AccountService, useClass: AccountServiceMock }
      ]
    }).compileComponents();
  
  fixture = TestBed.createComponent(CentralEmails);
    component = fixture.componentInstance;
    accountService = TestBed.inject(AccountService) as unknown as AccountServiceMock;
    await fixture.whenStable();
    fixture.detectChanges();
  });

  // check if the component does not start with anything trash 
  describe('Creating component', () => {
 
    it('Should create component with success', () => {
      expect(component).toBeTruthy();
    });
 
    it('Should start showModal as false', () => {
      expect(component.showModal).toBeFalse();
    });
 
    it('Should start showPasswordModal as false', () => {
      expect(component.showPasswordModal).toBeFalse();
    });
 
    it('Should start showDetailModal as false', () => {
      expect(component.showDetailModal).toBeFalse();
    });
 
    it('Should start isLoading as false after load', () => {
      expect(component.isLoading).toBeFalse();
    });
 
    it('Should start newEmail as empty', () => {
      expect(component.newEmail).toBe('');
    });
 
    it('Should start newPassword as empty', () => {
      expect(component.newPassword).toBe('');
    });
 
    it('Should start passwordResult as empty', () => {
      expect(component.passwordResult).toBe('');
    });
 
    it('Should start isCheckingPassword as false', () => {
      expect(component.isCheckingPassword).toBeFalse();
    });
 
    it('Should start showAlert as false', () => {
      expect(component.showAlert).toBeFalse();
    });
 
  });

  //chech if component to call correctly the service and if data is arrive in component
  describe('ngOnInit()', () => {
 
    it('Should call loadEmails on init', () => {
      spyOn(accountService, 'getByUserId').and.callThrough();
      component.ngOnInit();
      expect(accountService.getByUserId).toHaveBeenCalled();
    });
 
    it('Should populate emails after load', () => {
      expect(component.emails.length).toBeGreaterThan(0);
    });
 
  });

  //check if modal add email open and close correctly
  describe('openModal() / closeModal()', () => {
 
    it('Should open modal', () => {
      component.openModal();
      expect(component.showModal).toBeTrue();
    });
 
    it('Should reset newEmail when open modal', () => {
      component.newEmail = 'teste@email.com';
      component.openModal();
      expect(component.newEmail).toBe('');
    });
 
    it('Should close modal', () => {
      component.showModal = true;
      component.closeModal();
      expect(component.showModal).toBeFalse();
    });
 
    it('Should reset newPassword when close modal', () => {
      component.newPassword = 'senha123';
      component.closeModal();
      expect(component.newPassword).toBe('');
    });
 
    it('Should reset passwordResult when close modal', () => {
      component.passwordResult = 'Password leaked 80 time';
      component.closeModal();
      expect(component.passwordResult).toBe('');
    });
 
  });


  //check if modal when opening fields are reseted and if modal open and close correctly
  describe('openPasswordModal() / closePasswordModal()', () => {
 
    it('Should open password modal', () => {
      component.openPasswordModal();
      expect(component.showPasswordModal).toBeTrue();
    });
 
    it('Should reset newPassword when open password modal', () => {
      component.newPassword = 'senha123';
      component.openPasswordModal();
      expect(component.newPassword).toBe('');
    });
 
    it('Should reset passwordResult when open password modal', () => {
      component.passwordResult = 'Password leaked 80 time';
      component.openPasswordModal();
      expect(component.passwordResult).toBe('');
    });
 
    it('Should close password modal', () => {
      component.showPasswordModal = true;
      component.closePasswordModal();
      expect(component.showPasswordModal).toBeFalse();
    });
 
    it('Should reset newPassword when close password modal', () => {
      component.newPassword = 'senha123';
      component.closePasswordModal();
      expect(component.newPassword).toBe('');
    });
 
    it('Should reset passwordResult when close password modal', () => {
      component.passwordResult = 'Password leaked 80 time';
      component.closePasswordModal();
      expect(component.passwordResult).toBe('');
    });
 
  });

  //Verify if the password has been is empty, if trye not call the service 
  //Calling service with true password
  //Check if result safe is stored in passwordResult
  //Check if isCheckingPassword is false both success and failure
  //Check show error
  describe('checkPassword()', () => {
 
    it('Should not call service if newPassword is empty', () => {
      spyOn(accountService, 'checkPassword').and.callThrough();
      component.newPassword = '';
      component.checkPassword();
      expect(accountService.checkPassword).not.toHaveBeenCalled();
    });
 
    it('Should call accountService.checkPassword with newPassword', () => {
      spyOn(accountService, 'checkPassword').and.callThrough();
      component.newPassword = 'Senha@123';
      component.checkPassword();
      expect(accountService.checkPassword).toHaveBeenCalledWith('Senha@123');
    });
 
    it('Should set passwordResult when password is leaked', () => {
      spyOn(accountService, 'checkPassword').and.returnValue(of('Password leaked 80 time'));
      component.newPassword = 'Senha@123';
      component.checkPassword();
      expect(component.passwordResult).toBe('Password leaked 80 time');
    });
 
    it('Should set passwordResult when password is safe', () => {
      spyOn(accountService, 'checkPassword').and.returnValue(of('Password safe'));
      component.newPassword = 'Senha@123';
      component.checkPassword();
      expect(component.passwordResult).toBe('Password safe');
    });
 
    it('Should set isCheckingPassword to false after success', () => {
      spyOn(accountService, 'checkPassword').and.returnValue(of('Password safe'));
      component.newPassword = 'Senha@123';
      component.checkPassword();
      expect(component.isCheckingPassword).toBeFalse();
    });
 
    it('Should set isCheckingPassword to false after error', () => {
      spyOn(accountService, 'checkPassword').and.returnValue(throwError(() => new Error('erro')));
      component.newPassword = 'Senha@123';
      component.checkPassword();
      expect(component.isCheckingPassword).toBeFalse();
    });
 
    it('Should set passwordResult to error message when service fails', () => {
      spyOn(accountService, 'checkPassword').and.returnValue(throwError(() => new Error('erro')));
      component.newPassword = 'Senha@123';
      component.checkPassword();
      expect(component.passwordResult).toBe('Erro ao verificar senha.');
    });
 
  });

  //It checks if clicking on an email in the list opens the details modal with the correct email and filtered breaches, and if everything is cleared when closed.
  describe('openDetail() / closeDetail()', () => {
 
    it('Should open detail modal', () => {
      component.openDetail('test@email.com');
      expect(component.showDetailModal).toBeTrue();
    });
 
    it('Should set selectedEmail', () => {
      component.openDetail('test@email.com');
      expect(component.selectedEmail).toBe('test@email.com');
    });
 
    it('Should filter selectedBreaches by email', () => {
      component.openDetail('test@email.com');
      expect(component.selectedBreaches.every(e => e.emailMonitored === 'test@email.com')).toBeTrue();
    });
 
    it('Should close detail modal', () => {
      component.showDetailModal = true;
      component.closeDetail();
      expect(component.showDetailModal).toBeFalse();
    });
 
    it('Should reset selectedEmail on close', () => {
      component.selectedEmail = 'test@email.com';
      component.closeDetail();
      expect(component.selectedEmail).toBe('');
    });
 
    it('Should reset selectedBreaches on close', () => {
      component.selectedBreaches = [mockEmail];
      component.closeDetail();
      expect(component.selectedBreaches.length).toBe(0);
    });
 
  });
 
//verify if when the email has more then one breach showed only one email in screen 
describe('uniqueEmails getter', () => {
 
    it('Should return unique emails only', () => {
      component.emails = [mockEmail, mockEmail];
      const unique = component.uniqueEmails;
      expect(unique.length).toBe(1);
    });
 
    it('Should return empty when emails is empty', () => {
      component.emails = [];
      expect(component.uniqueEmails.length).toBe(0);
    });
 
  });

  //verify count of breaches and if have not any email show 0  breaches 
  describe('breachCount()', () => {
 
    it('Should return correct breach count', () => {
      component.emails = [mockEmail];
      expect(component.breachCount('test@email.com')).toBe(1);
    });
 
    it('Should return 0 when no breaches', () => {
      component.emails = [{ ...mockEmail, nameBreaches: undefined }];
      expect(component.breachCount('test@email.com')).toBe(0);
    });
 
  });

  //verify format to biger numbers
  describe('formatCount()', () => {
 
    it('Should return — for null', () => {
      expect(component.formatCount(null)).toBe('—');
    });
 
    it('Should format millions', () => {
      expect(component.formatCount(1000000)).toBe('1.0M');
    });
 
    it('Should format thousands', () => {
      expect(component.formatCount(1000)).toBe('1.0K');
    });
 
    it('Should return number as string', () => {
      expect(component.formatCount(500)).toBe('500');
    });
 
  });

  //Verify if click on the breach expand and show more information and if click again collapse the information
  describe('toggleExpand()', () => {
 
    it('Should set expandedBreachId', () => {
      component.toggleExpand(1);
      expect(component.expandedBreachId).toBe(1);
    });
 
    it('Should collapse if same id clicked again', () => {
      component.expandedBreachId = 1;
      component.toggleExpand(1);
      expect(component.expandedBreachId).toBeNull();
    });
 
  });

  //verify if logout remove userId from localStorage and navigate to login page 
  describe('logout()', () => {
 
    it('Should remove userId from localStorage', () => {
      localStorage.setItem('userId', '1');
      component.logout();
      expect(localStorage.getItem('userId')).toBeNull();
    });
 
    it('Should navigate to /login', () => {
      const router = TestBed.inject(Router);
      spyOn(router, 'navigate');
      component.logout();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
 
  });
  //verify if the close alert, show alert will go to false
  describe('onAlertClose()', () => {
 
    it('Should hide alert', () => {
      component.showAlert = true;
      component.onAlertClose();
      expect(component.showAlert).toBeFalse();
    });
 
  });

  //verify if click on the button to add email with empty email if not call service and if show alert with success or error 
  describe('addEmail()', () => {
 
    it('Should not call service if newEmail is empty', () => {
      spyOn(accountService, 'addMonitored').and.callThrough();
      component.newEmail = '';
      component.addEmail();
      expect(accountService.addMonitored).not.toHaveBeenCalled();
    });
 
    it('Should call addMonitored with userId and email', () => {
      spyOn(accountService, 'addMonitored').and.callThrough();
      component.newEmail = 'novo@email.com';
      component.addEmail();
      expect(accountService.addMonitored).toHaveBeenCalled();
    });
 
    it('Should show success alert after add', () => {
      spyOn(accountService, 'addMonitored').and.returnValue(of('ok'));
      component.newEmail = 'novo@email.com';
      component.addEmail();
      expect(component.alertType).toBe('success');
      expect(component.showAlert).toBeTrue();
    });
 
    it('Should show error alert when add fails', () => {
      spyOn(accountService, 'addMonitored').and.returnValue(throwError(() => new Error('erro')));
      component.newEmail = 'novo@email.com';
      component.addEmail();
      expect(component.alertType).toBe('error');
      expect(component.showAlert).toBeTrue();
    });
 
  });

  //verify if call service with correct email if show alert 
  describe('deleteByEmail()', () => {
 
    it('Should call deleteByEmail on service', () => {
      spyOn(accountService, 'deleteByEmail').and.callThrough();
      component.deleteByEmail('test@email.com');
      expect(accountService.deleteByEmail).toHaveBeenCalledWith('test@email.com');
    });
 
    it('Should show success alert after delete', () => {
      spyOn(accountService, 'deleteByEmail').and.returnValue(of(void 0));
      component.deleteByEmail('test@email.com');
      expect(component.alertType).toBe('success');
      expect(component.showAlert).toBeTrue();
    });
 
    it('Should show error alert when delete fails', () => {
      spyOn(accountService, 'deleteByEmail').and.returnValue(throwError(() => new Error('erro')));
      component.deleteByEmail('test@email.com');
      expect(component.alertType).toBe('error');
      expect(component.showAlert).toBeTrue();
    });
 
  });
 
});
