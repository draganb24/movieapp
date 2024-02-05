import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiService } from 'src/app/service/movie-api.service';
import { Title, Meta } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { map, filter, tap, forkJoin, Subject, takeUntil } from 'rxjs';

interface MovieDetail {
  original_title: string;
  tagline: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
}

interface MovieVideo {
  results: { type: string; key: string }[];
}

interface MovieCast {
  original_name: string;
  character: string;
  profile_path: string;
}

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  standalone: true,
  imports: [CommonModule]
})


export class MovieDetailsComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();

  constructor(private service: MovieApiService, private router: ActivatedRoute, private titleService: Title, private metaService: Meta) { }

  getMovieDetailResult: MovieDetail | undefined;
  getMovieVideoResult: MovieVideo | undefined;
  getMovieCastResult: MovieCast[] | undefined;


  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    console.log(getParamId, 'getparamid#');

    forkJoin([
      this.service.getMovieDetails(getParamId),
      this.service.getMovieVideo(getParamId),
      this.service.getMovieCast(getParamId),
    ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([movieDetails, videoResult, castResult]) => {
        console.log(movieDetails, 'getmoviedetails#');
        this.getMovieDetailResult = movieDetails;
        this.updatePageMeta();

        const trailer = videoResult.results.find(
          (element: any) => element.type === 'Trailer'
        );
        if (trailer) {
          this.getMovieVideoResult = trailer.key;
        }

        console.log(castResult, 'movieCast#');
        this.getMovieCastResult = castResult.cast;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getMovie(id: any) {
    this.service.getMovieDetails(id).pipe(
      tap(async (result) => {
        console.log(result, 'getmoviedetails#');
        this.getMovieDetailResult = await result;
        this.updatePageMeta();
      })
    ).subscribe();
  }

  private updatePageMeta(): void {
    if (this.getMovieDetailResult) {
      this.titleService.setTitle(`${this.getMovieDetailResult.original_title} | ${this.getMovieDetailResult.tagline}`);

      this.metaService.updateTag({ name: 'title', content: this.getMovieDetailResult.original_title });
      this.metaService.updateTag({ name: 'description', content: this.getMovieDetailResult.overview });

      // Facebook Meta Tags
      this.metaService.updateTag({ property: 'og:type', content: 'website' });
      this.metaService.updateTag({ property: 'og:url', content: '' });
      this.metaService.updateTag({ property: 'og:title', content: this.getMovieDetailResult.original_title });
      this.metaService.updateTag({ property: 'og:description', content: this.getMovieDetailResult.overview });
      this.metaService.updateTag({
        property: 'og:image',
        content: `https://image.tmdb.org/t/p/original/${this.getMovieDetailResult.backdrop_path}`
      });
    }
  }

  getVideo(id: any) {
    this.service.getMovieVideo(id)
      .pipe(
        map((result) => result.results.find((element: any) => element.type === 'Trailer')),
        filter((trailer) => !!trailer),
        tap((trailer) => this.getMovieVideoResult = trailer?.key)
      )
      .subscribe();
  };

  getMovieCast(id: any) {
    this.service.getMovieCast(id).pipe(
      tap((result) => {
        console.log(result, 'movieCast#');
        this.getMovieCastResult = result.cast;
      })
    ).subscribe();
  }
}
