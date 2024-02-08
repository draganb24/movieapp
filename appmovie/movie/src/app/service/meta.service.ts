import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { MovieDetail } from 'app/models/movie-detail.interface';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  updateMoviePageMeta(movieDetail: MovieDetail): void {
    this.titleService.setTitle(
      `${movieDetail.original_title} | ${movieDetail.tagline}`
    );

    this.metaService.updateTag({
      name: 'title',
      content: movieDetail.original_title,
    });
    this.metaService.updateTag({
      name: 'description',
      content: movieDetail.overview,
    });

    // Facebook Meta Tags
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:url', content: '' });
    this.metaService.updateTag({
      property: 'og:title',
      content: movieDetail.original_title,
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: movieDetail.overview,
    });
    this.metaService.updateTag({
      property: 'og:image',
      content: `https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path}`,
    });
  }
}
