import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from './chat/chat.component';
import { FooterComponent } from './footer/footer.component';
import { LessonComponent } from './lesson/lesson.component';
import { NavigationStart, Router } from '@angular/router';
import { TweetsComponent } from './tweets/tweets.component';
import { LessonStartQuizSectionComponent } from './lesson-start-quiz-section/lesson-start-quiz-section.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  beforeEach(() => {TestBed.configureTestingModule({
    imports: [RouterTestingModule.withRoutes([
      { path: 'Tweets', component: TweetsComponent },
      { path: 'Lesson/:id/quizz', component: LessonStartQuizSectionComponent}
    ]),
       HttpClientModule],
    declarations: [AppComponent, HeaderComponent, ChatComponent, FooterComponent, LessonComponent],
    providers: [
      { provide: 'SocialAuthServiceConfig', useValue: {} },
      { provide: SocialAuthService, useValue: {} }
    ]
  });
  fixture = TestBed.createComponent(AppComponent);
  component = fixture.componentInstance;
  router = TestBed.inject(Router);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'babylon'`, () => {
    expect(component.title).toEqual('babylon');
  });

  it('should set isHome to true when navigating to /Home or /', () => {
    router.navigate(['/Home']);
    expect(component.isHome).toBe(true);

    router.navigate(['/']);
    expect(component.isHome).toBe(true);
  });

  it('should set isLessons to true when navigating to /Lessons or /Lesson/[1-7] or /Lesson/[1-7]/quizz', () => {
    router.navigate(['/Lessons']);
    expect(component.isLessons).toBe(true);

    router.navigate(['/Lesson/1']);
    expect(component.isLessons).toBe(true);

    router.navigate(['/Lesson/3/quizz']);
    expect(component.isLessons).toBe(true);
  });

  it('should set isTweets to true when navigating to /Tweets', () => {
    router.navigate(['/Tweets']);
    expect(component.isTweets).toBe(true);
  });

});
