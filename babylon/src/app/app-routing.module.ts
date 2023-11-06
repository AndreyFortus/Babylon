import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LessonsPageComponent } from './lessons-page/lessons-page.component'
import { LessonStartQuizSectionComponent } from './lesson-start-quiz-section/lesson-start-quiz-section.component';
import { LessonTheoryComponent } from './lesson-theory/lesson-theory.component';
import { ChatComponent } from './chat/chat.component';
import { ChatConversationComponent } from './chat-conversation/chat-conversation.component';

const routes: Routes = [
  {path: '', redirectTo: '/Home', pathMatch: 'full' }, // Это перенаправление на /home}
  { path: 'Home', component: HomePageComponent },
  { path: 'Lessons', component: LessonsPageComponent },
  { path: 'Lesson/:id/quizz', component: LessonStartQuizSectionComponent},
  { path: 'Lesson/:id', component: LessonTheoryComponent},
  { path: 'chat', component: ChatComponent },
  { path: 'chat/conversation/:chatId', component: ChatConversationComponent } // chatId - параметр маршруту
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }