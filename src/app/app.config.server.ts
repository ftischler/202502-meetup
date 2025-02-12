import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { provideServerRouting } from '@angular/ssr';
import { provideLocalStorageStub } from './shared/providers/provide-local-storage-stub';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes),
    provideLocalStorageStub(),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
