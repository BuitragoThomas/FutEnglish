import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { NewsService, NewsArticle } from '../services/news';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [Navbar, Footer, RouterLink],
  templateUrl: './feed.html',
  styleUrl: './feed.css'
})
export class Feed implements OnInit {
  private newsService = inject(NewsService);
  private route = inject(ActivatedRoute);

  currentLevel = signal<string>('B1');
  allNews = signal<NewsArticle[]>([]);
  isLoadingApi = signal<boolean>(false);

  filteredNews = computed(() => {
    const level = this.currentLevel();
    return this.allNews().filter(article => article.level === level);
  });

  heroArticle = computed(() => this.filteredNews()[0] ?? null);

  gridNews = computed(() => this.filteredNews().slice(1));

  ngOnInit(): void {
    const levelParam = this.route.snapshot.queryParamMap.get('level');
    if (levelParam) {
      this.currentLevel.set(levelParam);
    }

    this.allNews.set(this.newsService.getAllNews());
  }

  setLevel(level: string): void {
    this.currentLevel.set(level);
  }

  loadExternalNews(): void {
    this.isLoadingApi.set(true);
    this.newsService.getExternalFootballNews().subscribe(apiArticles => {
      const current = this.allNews();
      const newOnes = apiArticles.filter(a => !current.some(c => c.id === a.id));
      this.allNews.set([...current, ...newOnes]);
      this.isLoadingApi.set(false);
    });
  }
}