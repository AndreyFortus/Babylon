import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpHeaders } from '@angular/common/http';

import { TweetsServiceService, Tweet } from './tweets-service.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';

describe('TweetsService', () => {
  let tweetsService: TweetsServiceService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TweetsServiceService,
        { provide: 'SocialAuthServiceConfig', useValue: {} },
        { provide: SocialAuthService, useValue: {} }
      ],
    });

    tweetsService = TestBed.inject(TweetsServiceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should retrieve tweets and update the subject', () => {
    const sampleTweets = [
      new Tweet(1, 'Tweet 1', '2023-01-01T11:11:11', 'user1'),
      new Tweet(2, 'Tweet 2', '2023-01-02T22:22:22', 'user2')
    ];

    const expectedTweets = [
      new Tweet(1, 'Tweet 1', '2023-01-01\n11:11', 'user1'),
      new Tweet(2, 'Tweet 2', '2023-01-02\n22:22', 'user2')
    ];

    tweetsService.getTweets();

    const req = httpTestingController.expectOne(`${tweetsService['url']}list`);

    req.flush(sampleTweets);

    tweetsService.tweetsList$.subscribe(tweetsList => {
      expect(tweetsList).toEqual(expectedTweets);
    })
  });

  it('shuld send tweets with right body', () => {
    tweetsService.sendTweet('New tweet content');
    const req = httpTestingController.expectOne(`${tweetsService['url']}add`);
    expect(req.request.body).toEqual({ content: 'New tweet content' });
  })
});
