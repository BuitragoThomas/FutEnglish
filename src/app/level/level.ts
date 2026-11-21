import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importamos el Router

@Component({
  selector: 'app-level',
  standalone: true,
  imports: [],
  styleUrl: './level.css',
  templateUrl: './level.html',
})
export class Level {
  constructor(private router: Router) {}

  elegirNivel(nivel: 'A1-A2' | 'B1' | 'B2') {
    this.router.navigate(['/feed'], { queryParams: { level: nivel } });
  }
}