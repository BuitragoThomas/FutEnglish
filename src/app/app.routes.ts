import { Routes } from '@angular/router';
import { Onboarding } from './onboarding/onboarding';
import { Level } from './level/level';
import { Navbar } from './navbar/navbar';
import { Feed } from './feed/feed';
import { Footer } from './footer/footer';

export const routes: Routes = [
    { path: '', component: Onboarding },
    { path: 'Level', component: Level },
    { path: 'navbar', component: Navbar },
    { path: 'feed', component: Feed },
    { path: 'footer', component: Footer }
    
];