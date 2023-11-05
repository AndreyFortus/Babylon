import { Component } from '@angular/core';
import { Router, Event, NavigationStart} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'babylon';
  isHome = false;
  isLessons = false;
  isTweets = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        const contentElement = document.querySelector('.content') as HTMLElement;
        if (event.url === '/Lessons' || event.url === '/Lesson/' + ['1', '2', '3', '4', '5', '6', '7'].find(num => event.url === '/Lesson/' + num)) {
          this.isLessons = true;
          this.isHome = false;
          this.isTweets = false;
        }

        if (event.url === '/Home' || event.url === '/') {
          this.isHome = true;
          this.isLessons = false;
          this.isTweets = false;
        }

        if (event.url === '/Tweets') {
          this.isHome = false;
          this.isLessons = false;
          this.isTweets = true;
        }
      }
    });
  }
}
