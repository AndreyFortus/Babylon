import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { ChatApiService } from '../chat-api.service';
import { of, throwError } from 'rxjs';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let chatService: ChatApiService;

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
    chatService = TestBed.inject(ChatApiService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correct start conversations', () => {
    let mockValue = {
      conversationId: 1, 
      messages: []
    }
    spyOn(chatService, 'startConversation').and.returnValue(of(mockValue));
    component.searchBar = 'aaaaaaaaaa';
    component.startChat();
    expect(component.usernames).toContain('aaaaaaaaaa');

    component.searchBar = 'admin';
    component.startChat();
    expect(component.usernames).toContain('admin');

    component.searchBar = 'a';
    component.startChat();
    expect(component.usernames).not.toContain('a')
    
  });
});
