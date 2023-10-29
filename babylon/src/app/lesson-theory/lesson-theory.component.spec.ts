import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonTheoryComponent } from './lesson-theory.component';

describe('LessonTheoryComponent', () => {
  let component: LessonTheoryComponent;
  let fixture: ComponentFixture<LessonTheoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LessonTheoryComponent]
    });
    fixture = TestBed.createComponent(LessonTheoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
