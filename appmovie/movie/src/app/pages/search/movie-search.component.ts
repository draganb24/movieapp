import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MovieApiService } from 'app/service/movie-api.service';
import { Title, Meta } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
})
export class MovieSearchComponent implements OnInit {
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

  searchResults: any;
  searchForm = new FormGroup({
    movieName: new FormControl(null),
  });

  searchMovies() {
    console.log(this.searchForm.value, 'searchform#');
    this.service.getSearchMovie(this.searchForm.value).subscribe(result => {
      console.log(result, 'searchmovie##');
      this.searchResults = result.results;
    });
  }
}
