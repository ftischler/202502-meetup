import { makeEnvironmentProviders } from '@angular/core';
import { WA_LOCAL_STORAGE } from '@ng-web-apis/common';

export const localStorageStub = {
  clear: () => undefined,
  getItem: (_key: string) => null,
  key: (_index: number) => null,
  length: 0,
  removeItem: (_key: string) => undefined,
  setItem: (_key: string, _value: string) => undefined,
} satisfies Storage;

export const provideLocalStorageStub = () =>
  makeEnvironmentProviders([
    {
      provide: WA_LOCAL_STORAGE,
      useFactory: () => localStorageStub,
    },
  ]);
