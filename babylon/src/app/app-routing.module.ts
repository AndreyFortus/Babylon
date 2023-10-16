import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LessonsPageComponent } from './lessons-page/lessons-page.component';;

const routes: Routes = [
  { path: 'Home', component: HomePageComponent },
  { path: 'Lessons', component: LessonsPageComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
