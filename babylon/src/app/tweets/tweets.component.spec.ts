import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetsComponent } from './tweets.component';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';

describe('TweetsComponent', () => {
  let component: TweetsComponent;
  let fixture: ComponentFixture<TweetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [TweetsComponent],
      providers: [
        { provide: 'SocialAuthServiceConfig', useValue: {} },
        { provide: SocialAuthService, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(TweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
