import { inject } from '@angular/core';
import { WA_LOCAL_STORAGE } from '@ng-web-apis/common';

export type Credentials = {
  email: string;
  password: string;
};

export const injectAuth = () => {
  const localStorage = inject(WA_LOCAL_STORAGE);

  return {
    register: ({ email, password }: Credentials) => {
      localStorage.setItem(email, password);
    },
    login: ({ email, password }: Credentials) => {
      const storedPassword = localStorage.getItem(email);

      if (storedPassword === password) {
        localStorage.setItem('user', email);
        return true;
      }

      return false;
    },
    isLoggedIn: () => !!localStorage.getItem('user'),
    logout: () => localStorage.removeItem('user'),
    getUser: () => localStorage.getItem('user') ?? undefined,
  };
};
