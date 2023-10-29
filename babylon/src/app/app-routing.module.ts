import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LessonsPageComponent } from './lessons-page/lessons-page.component'
import { LessonStartQuizSectionComponent } from './lesson-start-quiz-section/lesson-start-quiz-section.component';

const routes: Routes = [
  {path: '', redirectTo: '/Home', pathMatch: 'full' }, // Это перенаправление на /home}
  { path: 'Home', component: HomePageComponent },
  { path: 'Lessons', component: LessonsPageComponent },
  { path: 'Lesson/:id/quizz', component: LessonStartQuizSectionComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
