import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { MovieSearchComponent } from './pages/search/movie-search.component';

export const rootRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: MovieSearchComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
];

