import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsPageComponent } from './lessons-page.component';
import { LessonsPageContentComponent } from '../lessons-page-content/lessons-page-content.component';
import { LessonsSliderComponent } from '../lessons-slider/lessons-slider.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLink } from '@angular/router';

describe('LessonsPageComponent', () => {
  let component: LessonsPageComponent;
  let fixture: ComponentFixture<LessonsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterLink, RouterTestingModule],
      declarations: [LessonsPageComponent, LessonsPageContentComponent, LessonsSliderComponent]
    });
    fixture = TestBed.createComponent(LessonsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
