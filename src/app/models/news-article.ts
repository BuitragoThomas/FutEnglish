export type Level = 'A1-A2' | 'B1' | 'B2';

export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  level: Level;
  league: string;
  readTime: number;
}