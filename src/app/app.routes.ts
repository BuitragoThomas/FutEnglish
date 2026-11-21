import { Routes } from '@angular/router';
import { Onboarding } from './onboarding/onboarding';
import { Level } from './level/level';
import { Feed } from './feed/feed';
import { ArticleDetail } from './article-detail/article-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'onboarding', pathMatch: 'full' },
  { path: 'onboarding', component: Onboarding },
  { path: 'level', component: Level },
  { path: 'feed', component: Feed },
  { path: 'article/:id', component: ArticleDetail },
  { path: '**', redirectTo: 'onboarding' },
];