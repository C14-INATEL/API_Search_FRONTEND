import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  

  const isLogged = localStorage.getItem('logged');

  if (isLogged === 'true') {
    return true;
  } else {

    router.navigate(['/login']);
    return false; 
  }
};