import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { GoogleAuthService } from '../google-auth.service';
import { ActivatedRoute } from '@angular/router';
import { TaskTextService } from '../task-text.service';

@Component({
  selector: 'app-lesson-start-quiz-section',
  templateUrl: './lesson-start-quiz-section.component.html',
  styleUrls: ['./lesson-start-quiz-section.component.css'],
})
export class LessonStartQuizSectionComponent implements OnInit {

  level: number = 0
  question: string = '';
  tasks: string[] =[];
  options: string[] = [];
  fillAnswer: string = '';
  selectedAnswer: number = -1;
  correctAnswer: number = -1
  fillCorrectAnswer: string = '';
  currentQuizz:number = 0;
  lessonId: number = 0;
  @Input() hp: number = 100;
  maxHp = this.hp;
  damage: number = this.maxHp/20
  isHit: boolean = false;
  isMiss: boolean = false;
  isChoiceQuestion: boolean = true;
  isFillQuestion: boolean = false;
  isContinue: boolean = true;
  win: boolean = false;
  loose: boolean = false;
  phrase: string = '';
  image: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private googleService: GoogleAuthService, private taskService: TaskTextService) {}

  ngOnInit(): void {
    this.googleService.level$.subscribe(level => {
          this.level = level;
        });
    this.route.params.subscribe(params => {
      this.lessonId = +params['id'];
      this.getChoiceQuestions(this.lessonId);
    });
    this.tasks = this.taskService.getTasks();
    if (this.level === 0) {
      this.isContinue = false;
    }
    this.image = `/assets/img/quizz/${this.getRandomInt(1, 11)}.gif`
    console.log(this.image);
  }

  getFillQuestions(id: number) {
    const url = 'http://127.0.0.1:8000/api/lesson/' + id + '/questions/fill-blank/'
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Token ${this.googleService.getAuthToken()}`)
    }
    this.http.get(url, header).subscribe((response: any) => {
      this.question = response[this.currentQuizz-10].question;
      this.fillAnswer = response[this.currentQuizz-10].correct_answer_fill;
      this.fillCorrectAnswer = response[this.currentQuizz-10].correct_answers_fill;
    });
  }

  getChoiceQuestions(id: number) {
    const url = 'http://127.0.0.1:8000/api/lesson/' + id + '/questions/multiple-choice/'
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Token ${this.googleService.getAuthToken()}`)
    }
    this.http.get(url, header).subscribe((response: any) => {
      this.options = [];
      this.options.push(response[this.currentQuizz].option_one);
      this.options.push(response[this.currentQuizz].option_two);
      this.options.push(response[this.currentQuizz].option_three);
      this.question = response[this.currentQuizz].question;
      this.correctAnswer = response[this.currentQuizz].correct_answer;
      console.log(this.options)
    });
  }

  calculateHealthSize(): string {
    const healthPercentage = (this.hp / this.maxHp) * 100;
    return healthPercentage + '%';
  }

  submitChoiceForm() {
    // В этом методе вы можете проверить, является ли выбранный ответ правильным.
    if (this.selectedAnswer === this.correctAnswer-1) {
      console.log('Правильный ответ!');
      this.hp -= this.damage
      this.getChoiceQuestions(this.lessonId);
      this.isHit = true;
      setTimeout(() => {
        this.isHit = false;
      }, 2000);
    } else {
      console.log('Неправильный ответ.');
      this.getChoiceQuestions(this.lessonId);
      this.isMiss = true;
      setTimeout(() => {
        this.isMiss = false;
      }, 2000);
    }
    this.currentQuizz += 1;
    if (this.currentQuizz === 10) {
      this.isChoiceQuestion = false;
      this.isFillQuestion = true;
      this.getFillQuestions(this.lessonId);
    }
  }

  submitFillForm() {
    if (this.fillAnswer.toLowerCase() === this.fillCorrectAnswer.toLowerCase()) {
      console.log('Правильный ответ!');
      this.hp -= this.damage
      this.getFillQuestions(this.lessonId);
      this.isHit = true;
      setTimeout(() => {
        this.isHit = false;
      }, 2000);
    } else {
      console.log('Неправильный ответ.');
      this.getFillQuestions(this.lessonId);
      this.isMiss = true;
      setTimeout(() => {
        this.isMiss = false;
      }, 2000);
    }
    this.currentQuizz += 1;
    if (this.currentQuizz === 20) {
      this.isContinue = false;
      if (this.hp/this.maxHp * 100 <= 30) {
        if (this.hp > 0) {
          this.getPhrase('partial-victory')
        }
        else if (this.hp === 0) {
          this.getPhrase('total-victory')
        }
        this.win = true;
        if (this.lessonId === this.level) {
          this.googleService.setlevel(this.level+1);
        }
      } else {
        this.getPhrase('defeat')
        this.loose = true;
      }
    }
    }

    getPhrase(key: string) {
      const url = 'http://127.0.0.1:8000/api/lesson/get-phrase/' + key;
      var header = {
        headers: new HttpHeaders()
          .set('Authorization',  `Token ${this.googleService.getAuthToken()}`)
      }
      this.http.get(url, header).subscribe((response: any) => {
        this.phrase = response.text;
      });
    }

    getRandomInt(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    }
  }
