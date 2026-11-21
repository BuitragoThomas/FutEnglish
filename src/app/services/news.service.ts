import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NewsArticle, Level } from '../models/news-article';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private readonly news: NewsArticle[] = [
    { id: 1, level: 'B1', league: 'Premier League', readTime: 4,
      title: 'Arsenal secures thrilling derby victory with a stoppage-time counter-attack',
      excerpt: 'The Gunners took all three points after a disciplined defensive display.',
      content: 'The manager praised the relentless work rate of his midfielders, noting their quick turnovers and defensive discipline in the final third.' },
    { id: 2, level: 'B1', league: 'LaLiga', readTime: 3,
      title: 'Late goal keeps the title race wide open',
      excerpt: 'A last-minute strike changes the table at the top.',
      content: 'The visitors defended deep for most of the match and relied on a quick counter-attack to score the winner.' },
    { id: 3, level: 'A1-A2', league: 'Champions League', readTime: 2,
      title: 'El equipo gana el match con un goal al final',
      excerpt: 'Un gol en el último minuto decide el partido.',
      content: 'El equipo jugó un gran match y el goal llegó al final. Los fans celebraron en el stadium.' },
    { id: 4, level: 'A1-A2', league: 'Liga BetPlay', readTime: 2,
      title: 'El portero hace un gran save en el último minuto',
      excerpt: 'Una atajada salva el empate para su equipo.',
      content: 'El goalkeeper estuvo muy seguro y mantuvo el clean sheet hasta el final del partido.' },
    { id: 5, level: 'B2', league: 'Premier League', readTime: 5,
      title: 'High press and quick transitions define the new tactical era',
      excerpt: 'Coaches are rethinking how teams recover the ball.',
      content: 'Managers increasingly build their game plans around aggressive pressing and rapid vertical transitions, forcing opponents into rushed decisions.' },
    { id: 6, level: 'B2', league: 'Champions League', readTime: 5,
      title: 'Squad rotation proves decisive in a congested fixture list',
      excerpt: 'Depth matters as much as the starting eleven.',
      content: 'With matches coming thick and fast, clubs that manage workloads intelligently are reaping the rewards in the knockout stages.' },
  ];

  getNews(): Observable<NewsArticle[]> {
    return of(this.news);
  }

  getNewsByLevel(level: Level): Observable<NewsArticle[]> {
    return of(this.news.filter(n => n.level === level));
  }

  getArticleById(id: number): Observable<NewsArticle | undefined> {
    return of(this.news.find(n => n.id === id));
  }
}