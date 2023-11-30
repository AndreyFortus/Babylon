import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ChatComponent],
      providers: [
        { provide: 'SocialAuthServiceConfig', useValue: {} },
        { provide: SocialAuthService, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
