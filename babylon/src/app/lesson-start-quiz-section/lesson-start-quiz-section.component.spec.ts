import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonStartQuizSectionComponent } from './lesson-start-quiz-section.component';

describe('LessonStartQuizSectionComponent', () => {
  let component: LessonStartQuizSectionComponent;
  let fixture: ComponentFixture<LessonStartQuizSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LessonStartQuizSectionComponent]
    });
    fixture = TestBed.createComponent(LessonStartQuizSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
