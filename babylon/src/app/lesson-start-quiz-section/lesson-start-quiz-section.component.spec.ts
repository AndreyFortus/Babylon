import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonStartQuizSectionComponent } from './lesson-start-quiz-section.component';
import { RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('LessonStartQuizSectionComponent', () => {
  let component: LessonStartQuizSectionComponent;
  let fixture: ComponentFixture<LessonStartQuizSectionComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterLink, RouterTestingModule, HttpClientModule, HttpClientTestingModule],
      declarations: [LessonStartQuizSectionComponent],
      providers: [
        { provide: 'SocialAuthServiceConfig', useValue: {} },
        { provide: SocialAuthService, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(LessonStartQuizSectionComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correct receive fill questions', () => {
    let mockResponse = []
    for (let i=0; i<20; i++) {
      mockResponse.push({
        question: 'test question ' + i,
        correct_answer_fill: 'correct answear ' + i, 
        correct_answers_fill: 'correct answears fill ' + i
      })
    }
    component.loggedIn = true;
    component.currentQuizz = 10;
    component.getFillQuestions(1);
    const req = httpTestingController.expectOne('http://127.0.0.1:8000/api/lesson/1/questions/fill-blank/');
    req.flush(mockResponse);
    console.log('question',mockResponse[component.currentQuizz-10].question);
    expect(component.question).toEqual('test question 0');
  });

  it('should correct receive choice questions', () => {
    let mockResponse = [];
    for (let i=0; i<20; i++) {
      mockResponse.push({
        option_one: '1',
        option_two: '2',
        option_three: '3',
        question: 'test question ' + i,
        correct_answer: 'test correct answer'
      })
    }
    component.loggedIn = true;
    component.currentQuizz = 0;
    component.getChoiceQuestions(1);
    const req = httpTestingController.expectOne('http://127.0.0.1:8000/api/lesson/1/questions/multiple-choice/');
    req.flush(mockResponse);
    expect(component.options).toEqual(['1', '2', '3'])
    expect(component.question).toEqual('test question 0')
  });

  it('should correct submit choice form', () => {
    component.selectedAnswer = 1;
    component.correctAnswer = 2;
    component.lessonId = 1;
    component.submitChoiceForm();
    httpTestingController.expectOne('http://127.0.0.1:8000/api/lesson/1/questions/multiple-choice/');
    expect(component.isHit).toEqual(true);

    component.correctAnswer = 3;
    component.submitChoiceForm();
    httpTestingController.expectOne('http://127.0.0.1:8000/api/lesson/1/questions/multiple-choice/');
    expect(component.isMiss).toEqual(true);

    component.currentQuizz = 9;
    component.submitChoiceForm();
    expect(component.isFillQuestion).toEqual(true);
  });

  it('should correct submit fill form', () => {
    component.fillAnswer = 'answer';
    component.fillCorrectAnswer = 'Answer';
    component.lessonId = 1;
    component.submitFillForm();
    httpTestingController.expectOne('http://127.0.0.1:8000/api/lesson/1/questions/fill-blank/');
    expect(component.isHit).toEqual(true);

    component.fillCorrectAnswer = 'not answer';
    component.submitFillForm();
    httpTestingController.expectOne('http://127.0.0.1:8000/api/lesson/1/questions/fill-blank/');
    expect(component.isMiss).toEqual(true);

    component.currentQuizz = 19;
    component.maxHp = 100;
    component.hp = 10;
    spyOn(component, 'getPhrase');
    component.submitFillForm();
    expect(component.isContinue).toEqual(false);
    expect(component.getPhrase).toHaveBeenCalledWith('partial-victory');
    expect(component.win).toEqual(true);

    component.currentQuizz = 19;
    component.maxHp = 100;
    component.hp = 0;
    component.submitFillForm();
    expect(component.getPhrase).toHaveBeenCalledWith('total-victory');
    expect(component.win).toEqual(true);

    component.currentQuizz = 19;
    component.maxHp = 100;
    component.hp = 90;
    component.submitFillForm();
    expect(component.loose).toEqual(true);
  });

  it('should return correct phrase', () => {
    component.getPhrase('total-victory');
    const req = httpTestingController.expectOne('http://127.0.0.1:8000/api/lesson/get-phrase/total-victory');
    req.flush({text: 'test phrase'});
    expect(component.phrase).toEqual('test phrase');
  });

});
