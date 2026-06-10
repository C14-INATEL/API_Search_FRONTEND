import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/Account/accountService';
import { AccountInterface } from '../../core/Account/accountInterface';
import { Alert } from '../alert/alert/alert';
import { switchMap, timer } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-central-emails',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, Alert],
  templateUrl: './central-emails.html', 
  styleUrls: ['./central-emails.css'],
})
export class CentralEmails implements OnInit {
  emails: AccountInterface[] = [];
  isLoading = false;
  showModal = false;
  newEmail = '';
  isLoadingModal = false;
  showPasswordModal = false;
  checkPasswordConsent = false;
  newPassword = '';
  passwordResult = '';
  isCheckingPassword = false;

  showAlert = false;
  alertMessage = '';
  alertTitle = '';
  alertType: 'success' | 'error' | 'warning' = 'success';

  showDetailModal = false;
  selectedEmail = '';
  selectedBreaches: AccountInterface[] = [];

  userId: number = Number(localStorage.getItem('userId'));

  constructor(
    private accountService: AccountService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmails();
  }

  openModal(): void {
    this.showModal = true
    this.newEmail = '';
  }

  closeModal(): void {
    this.showModal = false;
    this.newPassword = '';
    this.passwordResult = '';
  }

  openDetail(emailMonitored: string): void {
    this.selectedEmail = emailMonitored;
    this.selectedBreaches = this.emails.filter(e => e.emailMonitored === emailMonitored);
    this.showDetailModal = true;
  }

  closeDetail(): void {
    this.showDetailModal = false;
    this.selectedBreaches = [];
    this.selectedEmail = '';
  }

  addEmail(): void {
    if (!this.newEmail) return;
    this.isLoadingModal = true;
    this.accountService.addMonitored(this.userId, this.newEmail)
    .subscribe({
      next: () => {
        this.isLoadingModal = false;
        this.showModal = false;
        this.alertTitle = 'Sucesso';
        this.alertMessage = 'Email adicionado! Atualizando...';
        this.alertType = 'success';
        this.showAlert = true;
        this.cdr.detectChanges();
        timer(2000).subscribe(() => {
          this.loadEmails();
        });
      },
      error: (err: any) => {
        this.isLoadingModal = false;
        this.alertTitle = 'Erro';
        this.alertMessage = err?.error || err?.message || 'Não foi possível adicionar o email.';
        this.alertType = 'error';
        this.showAlert = true;
        this.cdr.detectChanges();
      }
    });
  }

  deleteEmailId(id: number): void {
    this.accountService.deleteById(id).subscribe({
      next: () => {
        this.alertTitle = 'Sucesso';
        this.alertMessage = 'Email removido com sucesso!';
        this.alertType = 'success';
        this.showAlert = true;
        this.loadEmails();
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        if (err.status === 429) {
          this.alertMessage = 'Muitas tentativas. Aguarde alguns segundos.';
          this.alertType = 'warning';
          this.showAlert = true;
        } else {
          this.alertTitle = 'Erro';
          this.alertMessage = 'Não foi possível remover o email.';
          this.alertType = 'error';
        }
          this.showAlert = true;
          this.cdr.detectChanges();
      }
    });
  }


  deleteByEmail(email: string): void {
    this.accountService.deleteByEmail(email).subscribe({
      next: () => {
        this.alertTitle = 'Sucesso';
        this.alertMessage = 'Email removido com sucesso!';
        this.alertType = 'success';
        this.showAlert = true;
        this.loadEmails();
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        if (err.status === 429) {
          this.alertMessage = 'Muitas tentativas. Aguarde alguns segundos.';
          this.alertType = 'warning';
          this.showAlert = true;
        } else {
        this.alertTitle = 'Erro';
        this.alertMessage = 'Não foi possível remover o email.';
        this.alertType = 'error';
        }
        this.showAlert = true;
        this.cdr.detectChanges();
    }
    });
  }

  onAlertClose(): void {
    this.showAlert = false;
  }

  get uniqueEmails(): AccountInterface[] {
    const seen = new Set<string>();
    return this.emails.filter(e => {
      if (seen.has(e.emailMonitored)) return false;
      seen.add(e.emailMonitored);
      return true;
    });
  }

  breachCount(emailMonitored: string): number {
    return this.emails.filter(e => e.emailMonitored === emailMonitored && e.nameBreaches).length;
  }

  formatCount(n: number | null | undefined): string {
    if (!n) return '—';
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
    if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
    return n.toString();
  }

  expandedBreachId: number | null = null;

  toggleExpand(id: number): void {
    this.expandedBreachId = this.expandedBreachId === id ? null : id;
  }

  logout(): void {
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  loadEmails(): void {
    this.isLoading = true;
    this.accountService.getByUserId(this.userId).subscribe({
      next: (data) => {
        this.emails = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        if (err.status === 429) {
          this.alertMessage = 'Muitas tentativas. Aguarde alguns segundos.';
          this.alertType = 'warning';
          this.showAlert = true;
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  refreshAll(): void {
    this.isLoading = true;

    const emailsSemBreaches = this.uniqueEmails.filter(
      e => this.breachCount(e.emailMonitored) === 0
    );

    if (emailsSemBreaches.length === 0) {
      this.isLoading = false;
      return;
    }

    const refreshSequencial = (index: number) => {
      if (index >= emailsSemBreaches.length) {
        this.accountService.getByUserId(this.userId).subscribe({
          next: (updated) => {
            this.emails = updated;
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        });
        return;
      }

      const e = emailsSemBreaches[index];
      this.accountService.refreshEmail(this.userId, e.emailMonitored).subscribe({
        next: () => {
          setTimeout(() => refreshSequencial(index + 1), 2000);
        },
        error: (err: any) => {
          if (err.status === 429) {
            this.alertMessage = 'Muitas tentativas. Aguarde alguns segundos.';
            this.alertType = 'warning';
            this.showAlert = true;
          } else {
          setTimeout(() => refreshSequencial(index + 1), 2000);
          }
        }
      });
    };

    refreshSequencial(0);
  }

  checkPassword(): void {
  if (!this.newPassword) return;
  this.isCheckingPassword = true;
  this.passwordResult = '';
  this.accountService.checkPassword(this.newPassword).subscribe({
    next: (result) => {
      this.isCheckingPassword = false;
      this.passwordResult = result;
      this.cdr.detectChanges();
    },
    error: () => {
      this.isCheckingPassword = false;
      this.passwordResult = 'Erro ao verificar senha.';
      this.cdr.detectChanges();
    }
    });
  }

  openPasswordModal(): void {
  this.showPasswordModal = true;
  this.newPassword = '';
  this.passwordResult = '';
  }

  closePasswordModal(): void {
    this.showPasswordModal = false;

    this.newPassword = '';
    this.passwordResult = '';
  }
}