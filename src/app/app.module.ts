import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NewsApiService} from './services/news-api.service';
import {NewsComponent} from './feature/news/news.component';
import {NewsArticleComponent} from './feature/news/components/news-article/news-article.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    NewsArticleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    AppRoutingModule,
    PaginationModule.forRoot()
  ],
  providers: [NewsApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
