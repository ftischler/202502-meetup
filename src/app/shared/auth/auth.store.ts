import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Credentials, injectAuth } from './inject-auth';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState((auth = injectAuth()) => ({
    isLoggedIn: auth.isLoggedIn(),
    user: auth.getUser(),
    authError: false,
  })),
  withMethods((store, auth = injectAuth(), router = inject(Router)) => ({
    login: async (credentials: Credentials) => {
      if (auth.login(credentials)) {
        patchState(store, {
          isLoggedIn: true,
          user: credentials.email,
          authError: false,
        });
        await router.navigate(['/']);
        return;
      }
      patchState(store, { authError: true });
    },
    logout: () => {
      auth.logout();
      patchState(store, { isLoggedIn: false, user: undefined });
      return true;
    },
  })),
);
