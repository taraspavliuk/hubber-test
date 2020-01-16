import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NewsQuery, NewsResponse} from '../models/news.model';
import {API_KEY} from '../dictionary';
import {Observable} from 'rxjs';

@Injectable()

export class NewsApiService {

  constructor(private http: HttpClient) {
  }

  getNews(query: Partial<NewsQuery>): Observable<NewsResponse> {
    return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines`, {
      params: {...query, apiKey: API_KEY}
    });
  }

}
