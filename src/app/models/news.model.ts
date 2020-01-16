export interface NewsSource {
  id: string;
  name: string;
}

export interface NewsArticle {
  source: NewsSource;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  content: string;
}

export interface NewsResponse {
  status: string;
  articles: NewsArticle[];
  totalResults: number;
  code: string;
  message: string;
}

export interface NewsQuery {
  q: string;
  country: string;
  category: string;
  page: string;
}
