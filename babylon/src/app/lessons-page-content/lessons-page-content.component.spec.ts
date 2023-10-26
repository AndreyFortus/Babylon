import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsPageContentComponent } from './lessons-page-content.component';

describe('LessonsPageContentComponent', () => {
  let component: LessonsPageContentComponent;
  let fixture: ComponentFixture<LessonsPageContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LessonsPageContentComponent]
    });
    fixture = TestBed.createComponent(LessonsPageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
