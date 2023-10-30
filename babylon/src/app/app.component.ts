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

  quizz_regex = /^\/Lesson\/[1-7]\/quizz$/;
  lesson_regex = /^\/Lesson\/[1-7]$/;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        const contentElement = document.querySelector('.content') as HTMLElement;
        if (event.url === '/Lessons' || this.lesson_regex.test(event.url) || this.quizz_regex.test(event.url)) {
          this.isLessons = true;
          this.isHome = false;
        }

        if (event.url === '/Home' || event.url === '/') {
          this.isHome = true;
          this.isLessons = false;
        }
      }
    });
  }
}
