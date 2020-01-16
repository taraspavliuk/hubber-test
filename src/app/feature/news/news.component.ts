import {Component} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {NewsApiService} from '../../services/news-api.service';
import {CATEGORIES, COUNTRIES} from '../../dictionary';
import {NewsArticle, NewsQuery, NewsResponse} from '../../models/news.model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, debounceTime, map, shareReplay, switchMap} from 'rxjs/operators';

@Component({
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  countries = COUNTRIES;
  categories = CATEGORIES;
  pageSize = 9;
  currentPage = 1;
  selectedCountry = {label: 'us', value: 'us'};
  selectedCategory = {label: 'all', value: ''};
  private filter$: BehaviorSubject<NewsQuery>;
  private response$: Observable<NewsResponse>;
  private news$: Observable<NewsArticle[]>;
  private totalResults$: Observable<number>;
  private error$: Observable<string>;

  constructor(private readonly newsApiService: NewsApiService) {

    this.filter$ = new BehaviorSubject({
      country: this.selectedCountry.value,
      category: this.selectedCategory.value,
      q: '',
      pageSize: this.pageSize.toString(),
      page: this.currentPage.toString()
    });

    this.response$ = this.filter$.asObservable()
      .pipe(
        debounceTime(200),
        switchMap(filter => this.fetchNews(filter)),
        shareReplay()
      );

    this.news$ = this.response$.pipe(map(r => r.articles));

    this.totalResults$ = this.response$.pipe(map(r => r.totalResults));

    this.error$ = this.response$.pipe(map(r => (r.status === 'error' ? r.message : '')));
  }

  private fetchNews(query: Partial<NewsQuery>) {
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

  onCountryChange() {
    this.filter$.next({...this.filter$.getValue(), country: this.selectedCountry.value, page: '1'});
    this.setPage(1);
  }

  onCountryCategory() {
    this.filter$.next({...this.filter$.getValue(), category: this.selectedCategory.value, page: '1'});
    this.setPage(1);
  }

  onQueryChange($event) {
    const q = $event.target.value.length > 2 ? $event.target.value : '';

    if (this.filter$.value.q !== q) {
      this.filter$.next({...this.filter$.getValue(), q, page: '1'});
      this.setPage(1);
    }
  }

  onPageChange($event) {
    this.filter$.next({...this.filter$.getValue(), page: $event.page.toString()});
  }

  setPage(page: number): void {
    this.currentPage = page;
  }

}
