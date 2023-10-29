import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsSliderComponent } from './lessons-slider.component';

describe('LessonsSliderComponent', () => {
  let component: LessonsSliderComponent;
  let fixture: ComponentFixture<LessonsSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LessonsSliderComponent]
    });
    fixture = TestBed.createComponent(LessonsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
