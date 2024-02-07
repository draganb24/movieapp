import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MovieApiService } from 'app/service/movie-api.service';
import { Title, Meta } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  providers: [HttpClientModule, MovieApiService]
})

export class MovieSearchComponent implements OnInit {
  searching = false;
  searchResults: any;

  constructor(
    private service: MovieApiService,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.setTitleAndMetaTags();
  }

  private setTitleAndMetaTags() {
    this.title.setTitle('Search movies - showtime');
    this.meta.updateTag({
      name: 'description',
      content: 'search here movies like avatar, war etc',
    });
  }

  searchForm = new FormGroup({
    movieName: new FormControl(null),
  });

  searchMovies() {
    this.searching = true;
    this.service.getSearchMovie(this.searchForm.value).subscribe({
      next: search => {
        this.searchResults = search.results;
        this.searching = false;
      },
      error: error => {
        console.error('Error fetching search results:', error);
        this.searching = false;
      },
    });
  }
}
