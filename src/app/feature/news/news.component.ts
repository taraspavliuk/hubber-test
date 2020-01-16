import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NewsApiService} from '../../services/news-api.service';
import {CATEGORIES, COUNTRIES} from '../../dictionary';
import {NewsArticle, NewsQuery, NewsResponse} from '../../models/news.model';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, map, shareReplay, startWith, switchMap} from 'rxjs/operators';

@Component({
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  countries = COUNTRIES;
  categories = CATEGORIES;
  pageSize = 12;
  private form: FormGroup;
  private response$: Observable<NewsResponse>;
  private news$: Observable<NewsArticle[]>;
  private totalResults$: Observable<number>;
  private error$: Observable<string>;

  constructor(readonly fb: FormBuilder,
              private readonly newsApiService: NewsApiService) {
    this.form = this.fb.group({
      country: ['us'],
      category: [''],
      q: [''],
      pageSize: [this.pageSize],
      page: [1]
    });
  }

  ngOnInit() {
    this.response$ = this.form.valueChanges
      .pipe(
        startWith(this.form.value),
        debounceTime(200),
        map((value: NewsQuery) => ({
          ...value,
          q: value.q.length > 2 ? value.q : ''
        })),
        map(form =>
          Object.keys(form).reduce((req, key) => (form[key] ? {...req, [key]: form[key]} : req), {})
        ),
        switchMap(req => this.fetchNews(req)),
        shareReplay()
      );

    this.news$ = this.response$.pipe(map(r => r.articles));

    this.totalResults$ = this.response$.pipe(map(r => r.totalResults));

    this.error$ = this.response$.pipe(map(r => (r.status === 'error' ? r.message : '')));
  }


  private fetchNews(query: Partial<NewsQuery>) {
    console.log('fetch news', query);
    return this.newsApiService.getNews(query)
      .pipe(
        catchError((err: HttpErrorResponse) =>
          of({
            status: 'error',
            articles: [],
            totalResults: 0,
            code: err.error.code,
            message: err.error.message
          })
        )
      );
  }

  onQueryChange($event) {
    const q = $event.target.value.length > 2 ? $event.target.value : '';

    if (this.form.value.q !== q) {
      this.form.patchValue({q});
    }
  }

  onPageChange(page: number) {
    this.form.patchValue({page});
  }

}
