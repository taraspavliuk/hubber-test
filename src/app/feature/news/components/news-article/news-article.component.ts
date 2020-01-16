import {Component, Input, OnInit} from '@angular/core';
import {NewsArticle} from '../../../../models/news.model';

@Component({
  selector: 'app-news-article',
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.scss']
})
export class NewsArticleComponent implements OnInit {
  @Input() item: NewsArticle;

  constructor() {
  }

  ngOnInit() {
  }

}
