import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiService } from 'app/service/movie-api.service';
import { CommonModule } from '@angular/common';
import { Subject, forkJoin } from 'rxjs';
import { MovieDetail } from 'app/models/movie-detail.interface';
import { MovieVideo } from 'app/models/movie-video.interface';
import { MovieCast } from 'app/models/movie-cast.interface';
import { MetaService } from 'app/service/meta.service';

  @Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.css'],
    standalone: true,
    imports: [CommonModule]
  })
  
  export class MovieDetailsComponent implements OnInit, OnDestroy {
  
    private unsubscribe$ = new Subject<void>();
    getMovieDetailResult: MovieDetail | undefined;
    getMovieVideoResult: MovieVideo | undefined;
    getMovieCastResult: MovieCast[] | undefined;
  
    constructor(
      private service: MovieApiService,
      private router: ActivatedRoute,
      private metaUpdateService: MetaService
    ) { }
  
    ngOnInit(): void {
      this.loadMovieDetails();
    }
  
    ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }
  
    async loadMovieDetails() {
      const getParamId = this.router.snapshot.paramMap.get('id');
    
      forkJoin({
        movieDetails: this.service.getMovieDetails(getParamId),
        videoResult: this.service.getMovieVideo(getParamId),
        castResult: this.service.getMovieCast(getParamId),
      }).subscribe({
        next: ({ movieDetails, videoResult, castResult }) => {
          this.getMovieDetailResult = movieDetails;
          this.updatePageMeta();
    
          const trailer = videoResult.results.find((element: any) => element.type === 'Trailer');
          this.getMovieVideoResult = trailer ? trailer.key : undefined;
    
          this.getMovieCastResult = castResult.cast;
        },
        error: error => {
          console.error('Error loading movie details:', error);
        }
      });
    }

  private updatePageMeta(): void {
    if (this.getMovieDetailResult) {
      this.metaUpdateService.updatePageMeta(this.getMovieDetailResult);
    }
  }

}
