import { Component, OnInit } from '@angular/core';
import { MovieApiService } from 'app/service/movie-api.service';
import { Title, Meta } from '@angular/platform-browser';
import { NgClass, NgFor } from '@angular/common';
import { MoviePosterComponent } from 'app/shared/movie-poster.component';
import { Observable, forkJoin, map } from 'rxjs';
import { MovieResult } from 'app/models/movie-result.interface';
import { HomeResults } from 'app/models/home-results.interface';
import { MovieCategory } from 'app/models/movie-category.interface';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [MoviePosterComponent, NgClass, NgFor],
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
      this.createMovieRequest('bannerApiData'),
      this.createMovieRequest('trendingMovieApiData'),
      this.createMovieRequest('fetchActionMovies'),
      this.createMovieRequest('fetchAdventureMovies'),
      this.createMovieRequest('fetchAnimationMovies'),
      this.createMovieRequest('fetchComedyMovies'),
      this.createMovieRequest('fetchDocumentaryMovies'),
      this.createMovieRequest('fetchScienceFictionMovies'),
      this.createMovieRequest('fetchThrillerMovies'),
    ];

    forkJoin(movieRequests).subscribe({
      next: (results: MovieResult[]) => {
        this.results.bannerResult = results[0];
        this.results.trendingMovieResult = results[1];
        this.results.actionMovieResult = results[2];
        this.results.adventureMovieResult = results[3];
        this.results.animationMovieResult = results[4];
        this.results.comedyMovieResult = results[5];
        this.results.documentaryMovieResult = results[6];
        this.results.scienceFictionMovieResult = results[7];
        this.results.thrillerMovieResult = results[8];
      },
      error: (error: unknown) => {
        console.error('Error fetching data:', error);
      },
    });
  }

  private createMovieRequest(apiMethod: string): Observable<MovieResult> {
    return this.service[apiMethod]().pipe(map((result: MovieResult) => result));
  }
}
