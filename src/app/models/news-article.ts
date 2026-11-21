export type Level = 'A1-A2' | 'B1' | 'B2';

export interface VocabularyItem {
  word: string;
  translation: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  level: Level;
  league: string;
  readTime: number;
  image: string;
  stadiumInfo: string;
  highlightTag: string;
  challenge: string;
  vocabulary: VocabularyItem[];
}