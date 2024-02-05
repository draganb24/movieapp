import { Component, OnInit } from '@angular/core';
import { MovieApiService } from 'app/service/movie-api.service';
import { Title, Meta } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MoviePosterComponent } from 'app/shared/movie-poster.component';
import { Observable, forkJoin, map } from 'rxjs';

interface MovieResult {
  results: any[];
}

interface Category {
  title: string;
  resultKey: keyof HomeResults;
}

interface HomeResults {
  bannerResult: MovieResult;
  trendingMovieResult: MovieResult;
  actionMovieResult: MovieResult;
  adventureMovieResult: MovieResult;
  animationMovieResult: MovieResult;
  comedyMovieResult: MovieResult;
  documentaryMovieResult: MovieResult;
  scienceFictionMovieResult: MovieResult;
  thrillerMovieResult: MovieResult;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, MoviePosterComponent]
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

  categories: Category[] = [
    { title: 'Trending Movies', resultKey: 'trendingMovieResult' },
    { title: 'Action Movies', resultKey: 'actionMovieResult' },
    { title: 'Adventure Movies', resultKey: 'adventureMovieResult' },
    { title: 'Animation Movies', resultKey: 'animationMovieResult' },
    { title: 'Comedy Movies', resultKey: 'comedyMovieResult' },
    { title: 'Documentary Movies', resultKey: 'documentaryMovieResult' },
    { title: 'Science-Fiction Movies', resultKey: 'scienceFictionMovieResult' },
    { title: 'Thriller Movies', resultKey: 'thrillerMovieResult' }
  ];

  constructor(private service: MovieApiService, private title: Title, private meta: Meta) {
  }

  ngOnInit(): void {
    this.setTitleAndMetaTags();
    this.fetchData();
  }

  private setTitleAndMetaTags() {
    this.title.setTitle('Home - showtime');
    this.meta.updateTag({ name: 'description', content: 'watch online movies' });
  }

  private fetchData() {
    const requests: Observable<MovieResult>[] = [
      this.createRequest('bannerApiData'),
      this.createRequest('trendingMovieApiData'),
      this.createRequest('fetchActionMovies'),
      this.createRequest('fetchAdventureMovies'),
      this.createRequest('fetchAnimationMovies'),
      this.createRequest('fetchComedyMovies'),
      this.createRequest('fetchDocumentaryMovies'),
      this.createRequest('fetchScienceFictionMovies'),
      this.createRequest('fetchThrillerMovies'),
    ];

    forkJoin(requests).subscribe({
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
      error: (error: any) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  private createRequest(apiMethod: string): Observable<MovieResult> {
    return this.service[apiMethod]().pipe(
      map((result: MovieResult) => result)
    );
  }
}
