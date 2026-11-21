import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { NewsArticle, Level } from '../models/news-article';

export type { NewsArticle, Level };

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private http = inject(HttpClient);
  private apiUrl = 'https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/news';

  private readonly mockNews: NewsArticle[] = [
    {
      id: 1,
      title: 'Arsenal secures thrilling Derby victory with stoppage-time counter-attack',
      excerpt: 'The Gunners took all three points tras una actuación defensiva impecable. The manager praised the relentless work rate of his midfielders.',
      content: 'Arsenal secured a dramatic victory at the Emirates Stadium in the 94th minute. After absorbing heavy pressure throughout the second half, a quick turnover in midfield launched a clinical counter-attack. The winger sprinted down the flank and delivered a pinpoint cross for the match winner, sparking wild celebrations among the 60,214 fans.',
      league: 'Premier League',
      level: 'B1',
      readTime: 4,
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
      stadiumInfo: 'Emirates Stadium • 60,214 fans',
      highlightTag: "90+4' Match Winner",
      challenge: 'Identifica 3 colocaciones sobre transiciones ofensivas en el fútbol inglés.',
      vocabulary: [
        { word: 'stoppage-time', translation: 'tiempo de adición' },
        { word: 'counter-attack', translation: 'contraataque' },
        { word: 'turnover', translation: 'recuperación / pérdida de balón' }
      ]
    },
    {
      id: 2,
      title: 'Real Madrid gana el match con un goal decisivo en el Bernabéu',
      excerpt: 'El equipo blanco dominó la possession durante todo el partido y consiguió una victoria clave en LaLiga.',
      content: 'El Real Madrid jugó un gran partido en casa. El goalkeeper tuvo dos atajadas muy importantes en el primer tiempo para mantener el clean sheet. En el minuto 80, el delantero anotó el goal de la victoria después de un excelente pass desde la banda derecha.',
      league: 'LaLiga',
      level: 'A1-A2',
      readTime: 3,
      image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80',
      stadiumInfo: 'Santiago Bernabéu • 78,000 fans',
      highlightTag: "80' Decisive Goal",
      challenge: 'Aprende 3 sustantivos básicos de posiciones y acciones en la cancha.',
      vocabulary: [
        { word: 'goalkeeper', translation: 'arquero / portero' },
        { word: 'clean sheet', translation: 'portería a cero' },
        { word: 'match', translation: 'partido' }
      ]
    },
    {
      id: 3,
      title: 'Tactical breakdown: How high pressing dismantled the low block in Champions League',
      excerpt: 'An in-depth analysis of inverted full-backs, half-spaces, and relentless Gegenpressing in European knockout football.',
      content: 'Modern European football increasingly hinges on spatial control. By deploying inverted full-backs to overload the central midfield, the coaching staff successfully neutralized the opposition low block. Whenever possession was lost, an aggressive five-second counter-press forced hurried clearances and sustained territorial dominance in the final third.',
      league: 'Champions League',
      level: 'B2',
      readTime: 6,
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
      stadiumInfo: 'Allianz Arena • 75,000 fans',
      highlightTag: 'Tactical Analysis',
      challenge: 'Domina vocabulario táctico avanzado sobre presión alta y bloques defensivos.',
      vocabulary: [
        { word: 'low block', translation: 'bloque bajo defensivo' },
        { word: 'inverted full-backs', translation: 'laterales invertidos' },
        { word: 'final third', translation: 'último tercio de la cancha' }
      ]
    },
    {
      id: 4,
      title: 'Millonarios y Nacional empatan en un clásico lleno de intensity',
      excerpt: 'Ambos equipos mostraron un gran level en El Campín con varias opciones de score en la segunda mitad.',
      content: 'El estadio El Campín vivió una gran fiesta del fútbol colombiano. El referee mostró varias tarjetas amarillas en un partido muy físico. Aunque los dos equipos buscaron el winning goal hasta el final, los defensas mantuvieron el orden y el marcador terminó 1-1.',
      league: 'Liga BetPlay',
      level: 'A1-A2',
      readTime: 3,
      image: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&w=800&q=80',
      stadiumInfo: 'Estadio El Campín • 36,000 fans',
      highlightTag: 'Clásico BetPlay',
      challenge: 'Identifica palabras clave usadas por el árbitro y los comentaristas.',
      vocabulary: [
        { word: 'referee', translation: 'árbitro' },
        { word: 'score', translation: 'anotar / marcador' },
        { word: 'winning goal', translation: 'gol de la victoria' }
      ]
    },
    {
      id: 5,
      title: 'Liverpool midfielders dominate possession in crucial away fixture',
      excerpt: 'Con un despliegue físico enorme, the Reds controlled the tempo and created multiple clear-cut chances.',
      content: 'Playing away from home is always a tough test in the Premier League, pero el mediocampo de Liverpool manejó los tiempos con madurez. Their constant movement off the ball opened passing lanes, allowing the forwards to exploit the space behind the defensive line.',
      league: 'Premier League',
      level: 'B1',
      readTime: 4,
      image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=800&q=80',
      stadiumInfo: 'Anfield • 61,000 fans',
      highlightTag: 'Away Victory',
      challenge: 'Reconoce expresiones comunes sobre control del ritmo y pases filtrados.',
      vocabulary: [
        { word: 'away fixture', translation: 'partido de visitante' },
        { word: 'clear-cut chances', translation: 'oportunidades claras' },
        { word: 'passing lanes', translation: 'líneas de pase' }
      ]
    },
    {
      id: 6,
      title: 'Post-match presser: Manager addresses squad rotation ahead of congested schedule',
      excerpt: 'Facing three fixtures in seven days, the head coach emphasized injury prevention and bench depth.',
      content: 'Speaking at the post-match press conference, the manager defended his decision to rotate five starters. With domestic cups and continental commitments colliding, managing player workload is paramount to avoiding hamstring strains and maintaining peak sharpness for the title run-in.',
      league: 'Premier League',
      level: 'B2',
      readTime: 5,
      image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=800&q=80',
      stadiumInfo: 'Etihad Stadium • Press Room',
      highlightTag: 'Press Conference',
      challenge: 'Comprende jerga periodística británica sobre rotaciones y calendario.',
      vocabulary: [
        { word: 'congested schedule', translation: 'calendario apretado' },
        { word: 'bench depth', translation: 'profundidad de plantilla' },
        { word: 'title run-in', translation: 'recta final por el título' }
      ]
    }
  ];

  private loadedArticles: NewsArticle[] = [...this.mockNews];

  getNews(): Observable<NewsArticle[]> {
    return of(this.loadedArticles);
  }

  getNewsByLevel(level: Level): Observable<NewsArticle[]> {
    return of(this.loadedArticles.filter(n => n.level === level));
  }

  getArticleById(id: number): Observable<NewsArticle | undefined> {
    return of(this.loadedArticles.find(n => n.id === id));
  }

  getExternalFootballNews(): Observable<NewsArticle[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        const results = (response?.articles || []).slice(0, 6);
        const levels: Level[] = ['A1-A2', 'B1', 'B2'];

        return results.map((item: any, index: number): NewsArticle => ({
          id: 100 + index,
          title: item.headline || 'Premier League Live Update',
          excerpt: item.description || 'Latest football news directly from ESPN.',
          content: item.description || 'Full match report available on ESPN.',
          league: 'Premier League',
          level: levels[index % 3],
          readTime: 3,
          image: item.images?.[0]?.url || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
          stadiumInfo: 'ESPN Sport • Live API',
          highlightTag: 'Live News',
          challenge: 'Practica comprensión lectora con noticias reales en inglés.',
          vocabulary: [
            { word: 'fixture', translation: 'partido programado' },
            { word: 'squad', translation: 'plantilla / equipo' }
          ]
        }));
      }),
      tap(apiArticles => {
        const newOnes = apiArticles.filter(
          a => !this.loadedArticles.some(existing => existing.id === a.id)
        );
        this.loadedArticles = [...this.loadedArticles, ...newOnes];
      }),
      catchError(() => of(this.mockNews))
    );
  }
}