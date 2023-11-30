import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsSliderComponent } from './lessons-slider.component';
import { RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('LessonsSliderComponent', () => {
  let component: LessonsSliderComponent;
  let fixture: ComponentFixture<LessonsSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterLink, RouterTestingModule],
      declarations: [LessonsSliderComponent],
      providers: []
    });
    fixture = TestBed.createComponent(LessonsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
