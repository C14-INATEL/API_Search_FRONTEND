import { Routes } from '@angular/router';

export const routes: Routes = [

  {path: '',loadComponent: () => import('./pages/home/home').then(m => m.Home)},

  {path: 'login',loadComponent: () =>import('./pages/login/login').then(m => m.Login),
    children: [{path: 'forgot-password',loadComponent: () =>import('./pages/forgot-password/forgot-password').then(m => m.ForgotPassword),
    children: [{path: 'new-password',loadComponent: () =>import('./pages/new-password/new-password').then(m => m.NewPassword)}]}]
  },
  {path: 'register',loadComponent: () =>import('./pages/register/register').then(m => m.Register)},


  {path: '**',redirectTo: ''}
];