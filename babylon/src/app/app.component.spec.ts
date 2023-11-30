import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from './chat/chat.component';
import { FooterComponent } from './footer/footer.component';
import { LessonComponent } from './lesson/lesson.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, HttpClientModule],
    declarations: [AppComponent, HeaderComponent, ChatComponent, FooterComponent, LessonComponent],
    providers: [
      { provide: 'SocialAuthServiceConfig', useValue: {} },
      { provide: SocialAuthService, useValue: {} }
    ]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'babylon'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('babylon');
  });
});
