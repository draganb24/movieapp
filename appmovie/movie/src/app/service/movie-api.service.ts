import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MOVIE_API_CONFIG } from '../config/movie-api.config';
import { MovieGenres } from '../enum/movie-genres.enum';

@Injectable({
  providedIn: 'root',
})
export class MovieApiService {
  constructor(private http: HttpClient) {}

  baseurl = MOVIE_API_CONFIG.baseUrl;
  apikey = MOVIE_API_CONFIG.apiKey;

  bannerApiData(): Observable<any> {
    return this.http.get(
      `${this.baseurl}/trending/all/week?api_key=${this.apikey}`
    );
  }

  trendingMovieApiData(): Observable<any> {
    return this.http.get(
      `${this.baseurl}/trending/movie/day?api_key=${this.apikey}`
    );
  }

  getSearchMovie(data: any): Observable<any> {
    return this.http.get(
      `${this.baseurl}/search/movie?api_key=${this.apikey}&query=${data.movieName}`
    );
  }

  getMovieDetails(data: any): Observable<any> {
    return this.http.get(
      `${this.baseurl}/movie/${data}?api_key=${this.apikey}`
    );
  }

  getMovieVideo(data: any): Observable<any> {
    return this.http.get(
      `${this.baseurl}/movie/${data}/videos?api_key=${this.apikey}`
    );
  }

  getMovieCast(data: any): Observable<any> {
    return this.http.get(
      `${this.baseurl}/movie/${data}/credits?api_key=${this.apikey}`
    );
  }

  fetchActionMovies(): Observable<any> {
    return this.http.get(this.getGenreUrl(MovieGenres.Action));
  }

  fetchAdventureMovies(): Observable<any> {
    return this.http.get(this.getGenreUrl(MovieGenres.Adventure));
  }

  fetchAnimationMovies(): Observable<any> {
    return this.http.get(this.getGenreUrl(MovieGenres.Animation));
  }

  fetchComedyMovies(): Observable<any> {
    return this.http.get(this.getGenreUrl(MovieGenres.Comedy));
  }

  fetchDocumentaryMovies(): Observable<any> {
    return this.http.get(this.getGenreUrl(MovieGenres.Documentary));
  }

  fetchScienceFictionMovies(): Observable<any> {
    return this.http.get(this.getGenreUrl(MovieGenres.ScienceFiction));
  }

  fetchThrillerMovies(): Observable<any> {
    return this.http.get(this.getGenreUrl(MovieGenres.Thriller));
  }

  private getGenreUrl(genre: MovieGenres): string {
    return `${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=${genre}`;
  }

  // Add a mapped type to allow indexing with a string
  [key: string]: ((...args: any[]) => Observable<any>) | any;
}
