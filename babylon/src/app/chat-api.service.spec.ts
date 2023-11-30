import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ChatApiService, Message } from './chat-api.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { GoogleAuthService } from './google-auth.service';
import { of } from 'rxjs';

describe('ChatApiService', () => {
  let service: ChatApiService;
  let httpMock: HttpTestingController;
  let authService: GoogleAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        { provide: 'SocialAuthServiceConfig', useValue: {} },
        { provide: SocialAuthService, useValue: {} }
      ]
    });
    service = TestBed.inject(ChatApiService);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(GoogleAuthService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user list and update properties', () => {
    const dummyResponse = [
      {
          "id": 1,
          "initiator": {
              "url": "http://127.0.0.1:8000/api/users/7/detail/",
              "id": 1,
              "username": "username 1",
              "email": "donkervoort21@gmail.com",
              "first_name": "andrey",
              "last_name": "nemesis",
              "profile_picture": "",
              "level": 16
          },
          "receiver": {
              "url": "http://127.0.0.1:8000/api/users/12/detail/",
              "id": 12,
              "username": "username 2",
              "email": "andrey020904@gmail.com",
              "first_name": "Андрей",
              "last_name": "Фортус",
              "profile_picture": "https://lh3.googleusercontent.com/a/ACg8ocIHcYHgacgUlmZ5d00zwzJNWv8e_oPk0AE3ch_cnpNR_OM=s96-c",
              "level": 7
          },
          "last_message": {
              "id": 20,
              "text": "TEST last message !",
              "timestamp": "2023-11-15T16:43:10.464751+02:00",
              "sender": 7,
              "is_read": false
          }
      },
      {
          "id": 2,
          "initiator": {
              "url": "http://127.0.0.1:8000/api/users/7/detail/",
              "id": 7,
              "username": "username 1",
              "email": "donkervoort21@gmail.com",
              "first_name": "andrey",
              "last_name": "nemesis",
              "profile_picture": "",
              "level": 16
          },
          "receiver": {
              "url": "http://127.0.0.1:8000/api/users/13/detail/",
              "id": 13,
              "username": "username 3",
              "email": "rosyknikita@gmail.com",
              "first_name": "Никита",
              "last_name": "Росик",
              "profile_picture": "https://lh3.googleusercontent.com/a/ACg8ocKLJxKA-GDlAEXrXb9dHN7JOpOVj2DTE_0cPAK5OQBm=s96-c",
              "level": 7
          },
          "last_message": {
            "id": 20,
            "text": "TEST last message 2",
            "timestamp": "2023-11-15T16:43:10.464751+02:00",
            "sender": 7,
            "is_read": false
        }
      }
  ];

    authService.setUsername('username 1')
    service.getNewMessagesUpdates().subscribe(data => {
      expect(service.getUsernames()).toEqual(['username 2', 'username 3']);
      expect(service.getMessages()).toEqual(["TEST last message !", "TEST last message 2"]);
      expect(data).toEqual([false, false]);
    });
    const req = httpMock.expectOne('http://127.0.0.1:8000/api/conversations/');
    req.flush(dummyResponse);
  });

  it('should update read status', () => {
    service.updateReadStatus(1, true);
    const req = httpMock.match('http://127.0.0.1:8000/api/conversations/');
    expect(req[0].request.body).toEqual({"conversation_id": 1, "is_read": true});
  });

  it('should correct return conversation id', () => {
    const mockMessages = {"initiator": {
      "url": "http://127.0.0.1:8000/api/users/12/detail/",
      "id": 12,
      "username": "sotpkmurfy",
      "email": "andrey020904@gmail.com",
      "first_name": "Андрей",
      "last_name": "Фортус",
      "profile_picture": "https://lh3.googleusercontent.com/a/ACg8ocIHcYHgacgUlmZ5d00zwzJNWv8e_oPk0AE3ch_cnpNR_OM=s96-c",
      "level": 7
  },
  "receiver": {
      "url": "http://127.0.0.1:8000/api/users/7/detail/",
      "id": 7,
      "username": "ybrhblyybo",
      "email": "test@gmail.com",
      "first_name": "test_name",
      "last_name": "test_name",
      "profile_picture": "",
      "level": 16
  },
  "message_set": [
      {
          "id": 9,
          "text": "test 1",
          "timestamp": "2023-11-10T10:47:48.666875+02:00",
          "sender": 7
      },
      {
          "id": 8,
          "text": "test 2",
          "timestamp": "2023-11-09T18:05:50.414795+02:00",
          "sender": 13
      }
  ]
}

    const conversationId = 1;
    const messages = [new Message(9, 'test 1', "2023-11-10T10:47:48.666875+02:00", 7), new Message(8, 'test 2', "2023-11-09T18:05:50.414795+02:00", 13)]

    const expectedData = {
      conversationId,
      messages
    }
    service.startConversation('').subscribe(data => {
      expect(data).toEqual(expectedData)
    });
    const req = httpMock.expectOne('http://127.0.0.1:8000/api/conversations/start/');
    req.flush({conversation_id: 1});
    httpMock.expectOne('http://127.0.0.1:8000/api/conversations/1/').flush(mockMessages);
  });

  

});
