import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer'; 

@Component({
  selector: 'app-feed',
  imports: [CommonModule, Footer, Navbar],
  templateUrl: './feed.html',
  styleUrl: './feed.css'
})
export class Feed implements OnInit {
  currentLevel = signal<'A1-A2' | 'B1' | 'B2'>('B1');
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['level']) {
        this.currentLevel.set(params['level']);
      }
    });
  }
  setLevel(level: 'A1-A2' | 'B1' | 'B2') {
    this.currentLevel.set(level);
  }
}
