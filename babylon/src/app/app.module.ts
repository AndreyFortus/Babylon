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
    LessonStartQuizSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ChatApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
