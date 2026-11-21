import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { NewsService } from '../services/news.service';
import { NewsArticle } from '../models/news-article';

@Component({
  selector: 'app-article-detail',
  imports: [RouterLink, Navbar, Footer],
  templateUrl: './article-detail.html',
  styleUrl: './article-detail.css',
})
export class ArticleDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private newsService = inject(NewsService);

  article = signal<NewsArticle | undefined>(undefined);
  loading = signal(true);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.newsService.getArticleById(id).subscribe(a => {
      this.article.set(a);
      this.loading.set(false);
    });
  }
}