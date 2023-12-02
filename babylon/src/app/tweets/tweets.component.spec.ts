import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetsComponent } from './tweets.component';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('TweetsComponent', () => {
  let component: TweetsComponent;
  let fixture: ComponentFixture<TweetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule],
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

  it('should render tweets when loggedIn is true', () => {
    component.loggedIn = true;
    component.tweets_list = [
      { id: 1, user: 'User1', created_at: '2023-01-01', content: 'Tweet content 1' },
      { id: 2, user: 'User2', created_at: '2023-01-02', content: 'Tweet content 2' },
    ];

    fixture.detectChanges();
    let tweets = fixture.debugElement.queryAll(By.css('.tweet'))
    expect(tweets.length).toBe(2);

    // You can add more assertions based on your specific expectations
  });

  it('should render not allowed text when not logged in', () => {
    component.loggedIn = false;
    fixture.detectChanges();
    let container = fixture.debugElement.query(By.css('.not-allowed-container'));
    expect(container).toBeTruthy();
  });

});
