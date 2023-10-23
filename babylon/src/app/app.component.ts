import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'babylon';
  isHome = false;
  isLessons = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        const contentElement = document.querySelector('.content') as HTMLElement;
        if (event.url === '/Lessons') {
          // if (contentElement !== null) {
          //   contentElement.style.background = 'white';
          // }
          this.isLessons = true;
          this.isHome = false;
        }

        if (event.url === '/Home') {
          // if (contentElement !== null) {
          //   contentElement.style.background = 'linear-gradient(90deg, rgba(79,37,28,0.6) 0%, rgba(79,37,28,0.6) 100%), url(\'/assets/img/home-page/bg.jpg\') no-repeat';
          //   contentElement.style.backgroundSize = 'cover'
          // }
          this.isHome = true;
          this.isLessons = false;
        }
      }
    });
  }
}
