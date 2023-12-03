import { TestBed } from '@angular/core/testing';

import { GoogleAuthService } from './google-auth.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

class MockAuthService {
  getAccessToken(providerId: string): Promise<string> {
    // Mocked implementation, you can adjust this as needed
    return Promise.resolve('mockedAccessToken');
  }
}

describe('GoogleAuthService', () => {
  let service: GoogleAuthService;
  let httpTestingController: HttpTestingController
  let authService: SocialAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GoogleAuthService,
        { provide: 'SocialAuthServiceConfig', useValue: {} },
        { provide: SocialAuthService, useClass: MockAuthService }
      ]
    });
    service = TestBed.inject(GoogleAuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(SocialAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update user info', () => {
    const sampleUser = {
      first_name: 'test first name',
      last_name: 'test last name',
      profile_picture: 'test profile picture',
      username: 'test username',
      email: 'test email',
      level: 'test level',
      id: 'test id'
    }
    service.getUserInfo('');
    const req = httpTestingController.expectOne('http://127.0.0.1:8000/api/get-user-info/');
    req.flush(sampleUser)

    service.name$.subscribe(name => {
      expect(name).toEqual('test first name test last name');
    })

  });

  it('should send correct token', () => {
    service.sendAccessTokenToServer('test token');
    const req = httpTestingController.expectOne('http://127.0.0.1:8000/auth/google/');
    expect(req.request.body).toEqual({ google_token: 'test token' })
  })

  it('should update user info', () => {
    service.getUserInfo('');
    const req = httpTestingController.expectOne('http://127.0.0.1:8000/api/get-user-info/');
    req.flush({ "level": 1 })

    service.level$.subscribe(level => {
      expect(level).toEqual(1);
    })

  });

});
