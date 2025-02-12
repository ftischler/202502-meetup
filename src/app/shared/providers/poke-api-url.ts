import { InjectionToken, makeEnvironmentProviders } from '@angular/core';

export const POKE_API_URL = new InjectionToken<string>('POKE_API_URL');

export const providePokeApiUrl = (url: string) =>
  makeEnvironmentProviders([{ provide: POKE_API_URL, useValue: url }]);
