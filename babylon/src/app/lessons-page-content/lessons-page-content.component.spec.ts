import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsPageContentComponent } from './lessons-page-content.component';
import { LessonsSliderComponent } from '../lessons-slider/lessons-slider.component';
import { RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('LessonsPageContentComponent', () => {
  let component: LessonsPageContentComponent;
  let fixture: ComponentFixture<LessonsPageContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterLink, RouterTestingModule],
      declarations: [LessonsPageContentComponent, LessonsSliderComponent]
    });
    fixture = TestBed.createComponent(LessonsPageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
