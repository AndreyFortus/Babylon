import { TestBed } from '@angular/core/testing';

import { ChatApiService } from './chat-api.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';

describe('ChatApiService', () => {
  let service: ChatApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: 'SocialAuthServiceConfig', useValue: {} },
        { provide: SocialAuthService, useValue: {} }
      ]
    });
    service = TestBed.inject(ChatApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
