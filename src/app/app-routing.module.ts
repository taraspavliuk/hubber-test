import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NewsComponent} from './feature/news/news.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {PaginationModule} from 'ngx-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: NewsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,
    PaginationModule.forRoot()],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
