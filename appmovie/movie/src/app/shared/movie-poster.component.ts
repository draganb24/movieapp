import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-poster',
  template: `
    <img
      [src]="getImageUrl()"
      class="rowimg largeposter"
      alt="..."
      [routerLink]="['/movie', movie.id]" />
  `,
  styleUrls: ['./movie-poster.component.css'],
  standalone: true,
  imports: [RouterModule],
})
export class MoviePosterComponent {
  @Input() movie: any;

  getImageUrl(): string {
    return `https://image.tmdb.org/t/p/original/${this.movie.poster_path}`;
  }
}
