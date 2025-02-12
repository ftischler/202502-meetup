import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStore } from './shared/auth/auth.store';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./routes/home'),
  },
  {
    path: 'register',
    loadComponent: () => import('./routes/register'),
  },
  {
    path: 'login',
    loadComponent: () => import('./routes/login'),
  },
  {
    path: 'logout',
    redirectTo: () => (inject(AuthStore).logout() ? '/login' : '/'),
  },
  {
    path: 'pokemon/:name',
    loadComponent: () => import('./routes/pokemon'),
  },
];
