import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { NewsService } from '../services/news.service';
import { NewsArticle, Level } from '../models/news-article';

@Component({
  selector: 'app-feed',
  imports: [CommonModule, Footer, Navbar],
  templateUrl: './feed.html',
  styleUrl: './feed.css'
})
export class Feed implements OnInit {
  private route = inject(ActivatedRoute);
  private newsService = inject(NewsService);

  currentLevel = signal<Level>('B1');
  newsList = signal<NewsArticle[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['level']) {
        this.currentLevel.set(params['level']);
      }
      this.loadNews();
    });
  }

  setLevel(level: Level) {
    this.currentLevel.set(level);
    this.loadNews();
  }

  private loadNews() {
    this.loading.set(true);
    this.newsService.getNewsByLevel(this.currentLevel()).subscribe(list => {
      this.newsList.set(list);
      this.loading.set(false);
    });
  }
}
