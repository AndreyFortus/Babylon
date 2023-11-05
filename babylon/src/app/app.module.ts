import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ChatComponent } from './chat/chat.component';
import { ChatHumanCardComponent } from './chat-human-card/chat-human-card.component';
import { FooterComponent } from './footer/footer.component';
import { IntroComponent } from './intro/intro.component';
import { ChatApiService } from './chat-api.service';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './home-page/home-page.component';
import { LessonsPageComponent } from './lessons-page/lessons-page.component';
import { LessonsPageContentComponent } from './lessons-page-content/lessons-page-content.component';
import { LessonComponent } from './lesson/lesson.component';
import { LessonTheoryComponent } from './lesson-theory/lesson-theory.component';
import { LessonStartQuizSectionComponent } from './lesson-start-quiz-section/lesson-start-quiz-section.component';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { LessonsSliderComponent } from './lessons-slider/lessons-slider.component';
import { TweetsComponent } from './tweets/tweets.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChatComponent,
    ChatHumanCardComponent,
    FooterComponent,
    IntroComponent,
    HomePageComponent,
    LessonsPageComponent,
    LessonsPageContentComponent,
    LessonComponent,
    LessonTheoryComponent,
    LessonStartQuizSectionComponent,
    LessonsSliderComponent,
    TweetsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
  ],
  providers: [ChatApiService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '96564374042-vavmi8r65snddk6j3m0sk7f1v3r5ob9u.apps.googleusercontent.com',
              // '883088030860-7stqkkl4ipd974v4lp5pturmir8p0qfi.apps.googleusercontent.com',
              {
                scopes: 'openid',
              }
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
