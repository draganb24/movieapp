import { MovieResult } from './movie-result.interface';

export interface HomeResults {
  bannerResult: MovieResult;
  trendingMovieResult: MovieResult;
  actionMovieResult: MovieResult;
  adventureMovieResult: MovieResult;
  animationMovieResult: MovieResult;
  comedyMovieResult: MovieResult;
  documentaryMovieResult: MovieResult;
  scienceFictionMovieResult: MovieResult;
  thrillerMovieResult: MovieResult;
  [key: string]: MovieResult; // Add index signature
}
