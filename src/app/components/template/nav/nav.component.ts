import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  activeButtonIndex: number = 0; // Índice do botão ativo atualmente
  currentRoute: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  setActiveButton(index: number): void {
    this.activeButtonIndex = index;
  }

  isButtonActive(index: number): boolean {
    if (index === 0 && this.currentRoute === '/') {
      return true;
    } else if (index === 1 && this.currentRoute.includes('/products')) {
      return true;
    } else {
      return false;
    }
  }
}
