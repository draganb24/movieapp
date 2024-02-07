import {enableProdMode} from '@angular/core';

import { environment } from './environments/environment';
import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {provideRouter} from '@angular/router';
import { rootRoutes } from 'app/root-routes';
import { MovieApiService } from 'app/service/movie-api.service';
import { HttpClientModule } from '@angular/common/http';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, { 
  providers: [
    provideRouter(rootRoutes),
  ], 
})
  .catch(err => console.error(err));
