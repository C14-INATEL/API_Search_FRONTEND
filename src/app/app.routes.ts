import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  {path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home)},

  {path: 'login', loadComponent: () =>import('./pages/login/login').then(m => m.Login)},

  {path: 'register', loadComponent: () =>import('./pages/register/register').then(m => m.Register)},

  {path: 'forgot-password', loadComponent: () =>import('./pages/forgot-password/forgot-password').then(m => m.ForgotPassword)},

  {path: 'new-password', loadComponent: () =>import('./pages/new-password/new-password').then(m => m.NewPassword)},

  {path: 'validate-token', loadComponent: () =>import('./pages/validate-token/validate-token').then(m => m.ValidateToken)},

  {path: 'central-emails', loadComponent: () => import('./pages/central-emails/central-emails').then(m => m.CentralEmails), canActivate: [authGuard] },

  {path: 'alert', loadComponent: () =>import('./pages/alert/alert/alert').then(m => m.Alert)},

  {path: '**', redirectTo: ''}
];