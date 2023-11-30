import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonTheoryComponent } from './lesson-theory.component';
import { RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { SocialAuthService } from '@abacritt/angularx-social-login';

describe('LessonTheoryComponent', () => {
  let component: LessonTheoryComponent;
  let fixture: ComponentFixture<LessonTheoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterLink, RouterTestingModule, HttpClientModule],
      declarations: [LessonTheoryComponent],
      providers: [
        { provide: 'SocialAuthServiceConfig', useValue: {} },
        { provide: SocialAuthService, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(LessonTheoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
