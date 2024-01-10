import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AppEffects } from './state/users.effects';
import { provideAnimations } from '@angular/platform-browser/animations';
import { USER_KEY, loadReducer } from './state/users.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideStore({ [USER_KEY]: loadReducer }),
    provideEffects(AppEffects),
    provideStoreDevtools({
        maxAge: 25,
        logOnly: !isDevMode()
    }),
    provideAnimations()
]
};
