import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonTheoryComponent } from './lesson-theory.component';
import { RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('LessonTheoryComponent', () => {
  let component: LessonTheoryComponent;
  let fixture: ComponentFixture<LessonTheoryComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterLink, RouterTestingModule, HttpClientModule, HttpClientTestingModule],
      declarations: [LessonTheoryComponent],
      providers: [
        { provide: 'SocialAuthServiceConfig', useValue: {} },
        { provide: SocialAuthService, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(LessonTheoryComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correct render theory and phrase', () => {
    let sampleTheory = {
      lesson_title: 'test title',
      theory_text: 'test theory text',
      hp: 1,

    }
    component.loggedIn = true;
    component.lessonId = 1;
    component.getTheory(1)
    let req = httpTestingController.expectOne('http://127.0.0.1:8000/api/lesson/1/');
    req.flush(sampleTheory);
    expect(component.theoryText).toEqual('test theory text');
    expect(component.theoryTitle).toEqual('test title');
    component.getPhrase('theory');
    req = httpTestingController.match('http://127.0.0.1:8000/api/lesson/get-phrase/theory')[0];
    req.flush({text: 'test phrase'});
    expect(component.phrase).toEqual('test phrase');
  });
});
