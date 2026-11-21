import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Onboarding } from './onboarding/onboarding';
import { Level } from './level/level';

@Component({
  imports: [RouterOutlet, Onboarding, Level],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('futenglish');
}
