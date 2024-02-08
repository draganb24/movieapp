import { Component, OnInit } from '@angular/core';
import { MovieApiService } from 'app/service/movie-api.service';
import { Title, Meta } from '@angular/platform-browser';
import { Observable, forkJoin, map } from 'rxjs';
import { MovieResult } from 'app/models/movie-result.interface';
import { HomeResults } from 'app/models/home-results.interface';
import { MovieCategory } from 'app/models/movie-category.interface';
import { NgClass } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MoviePosterComponent } from 'app/shared/movie-poster.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [MoviePosterComponent, NgClass],
  providers: [HttpClientModule, MovieApiService]
})
export class HomeComponent implements OnInit {
  results: HomeResults = {
    bannerResult: { results: [] },
    trendingMovieResult: { results: [] },
    actionMovieResult: { results: [] },
    adventureMovieResult: { results: [] },
    animationMovieResult: { results: [] },
    comedyMovieResult: { results: [] },
    documentaryMovieResult: { results: [] },
    scienceFictionMovieResult: { results: [] },
    thrillerMovieResult: { results: [] },
  };

  movieCategories: MovieCategory[] = [
    { title: 'Trending Movies', categoryResultKey: 'trendingMovieResult' },
    { title: 'Action Movies', categoryResultKey: 'actionMovieResult' },
    { title: 'Adventure Movies', categoryResultKey: 'adventureMovieResult' },
    { title: 'Animation Movies', categoryResultKey: 'animationMovieResult' },
    { title: 'Comedy Movies', categoryResultKey: 'comedyMovieResult' },
    {
      title: 'Documentary Movies',
      categoryResultKey: 'documentaryMovieResult',
    },
    {
      title: 'Science-Fiction Movies',
      categoryResultKey: 'scienceFictionMovieResult',
    },
    { title: 'Thriller Movies', categoryResultKey: 'thrillerMovieResult' },
  ];

  constructor(
    private service: MovieApiService,
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    this.setTitleAndMetaTags();
    this.fetchMovieData();
  }

  private setTitleAndMetaTags() {
    this.title.setTitle('Home - showtime');
    this.meta.updateTag({
      name: 'description',
      content: 'watch online movies',
    });
  }

  private fetchMovieData() {
    const movieRequests: Observable<MovieResult>[] = [
      'bannerApiData',
      'trendingMovieApiData',
      'fetchActionMovies',
      'fetchAdventureMovies',
      'fetchAnimationMovies',
      'fetchComedyMovies',
      'fetchDocumentaryMovies',
      'fetchScienceFictionMovies',
      'fetchThrillerMovies',
    ].map(apiMethod => this.createMovieRequest(apiMethod));

    forkJoin(movieRequests).subscribe({
      next: (results: MovieResult[]) => {
        Object.keys(this.results).forEach((key, index) => {
          this.results[key] = results[index];
        });
      },
      error: (error: unknown) => {
        console.error('Error fetching data:', error);
      },
    });
  }

  private createMovieRequest(apiMethod: string): Observable<MovieResult> {
    return this.service[apiMethod]().pipe(map(result => result));
  }
}