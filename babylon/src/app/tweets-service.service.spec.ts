import { TestBed } from '@angular/core/testing';

import { TweetsServiceService } from './tweets-service.service';

describe('TweetsServiceService', () => {
  let service: TweetsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TweetsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
