import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleAuthService } from '../google-auth.service';
import { TaskTextService } from '../task-text.service';

@Component({
  selector: 'app-lesson-theory',
  templateUrl: './lesson-theory.component.html',
  styleUrls: ['./lesson-theory.component.css']
})
export class LessonTheoryComponent implements OnInit {
  lessonId: number = 0;
  level: number = 0;
  theoryTitle: string = '';
  theoryText: string = '';
  hp: number = 0;

  constructor(private route: ActivatedRoute, private http: HttpClient, private googleService: GoogleAuthService, private taskText: TaskTextService) { }

  ngOnInit(): void {
    this.googleService.level$.subscribe(level => {
      this.level = level;
    });
    this.route.params.subscribe(params => {
      this.lessonId = +params['id'];
      console.log(this.lessonId);
      this.getTheory(this.lessonId);
    });
  }

  getTheory(id: number) {
    const url = 'http://127.0.0.1:8000/api/lesson/' + this.lessonId + '/'
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Token ${this.googleService.getAuthToken()}`)
    }
    this.http.get(url, header).subscribe((response: any) => {
        this.theoryTitle = response.lesson_title;
        this.theoryText = response.theory_text;
        this.hp = response.hp;
        this.taskText.setAdditionalValue([response.multiple_choice_task, response.fill_blank_task]);
    });
  }
}
