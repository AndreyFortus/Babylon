import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatConversationComponent } from './chat-conversation.component';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('ChatConversationComponent', () => {
  let component: ChatConversationComponent;
  let fixture: ComponentFixture<ChatConversationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule],
      declarations: [ChatConversationComponent],
      providers: [
        { provide: 'SocialAuthServiceConfig', useValue: {} },
        { provide: SocialAuthService, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(ChatConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
