import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonStartQuizSectionComponent } from './lesson-start-quiz-section.component';
import { RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { SocialAuthService } from '@abacritt/angularx-social-login';

describe('LessonStartQuizSectionComponent', () => {
  let component: LessonStartQuizSectionComponent;
  let fixture: ComponentFixture<LessonStartQuizSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterLink, RouterTestingModule, HttpClientModule],
      declarations: [LessonStartQuizSectionComponent],
      providers: [
        { provide: 'SocialAuthServiceConfig', useValue: {} },
        { provide: SocialAuthService, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(LessonStartQuizSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
