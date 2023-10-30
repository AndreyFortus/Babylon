import { TestBed } from '@angular/core/testing';

import { TaskTextService } from './task-text.service';

describe('TaskTextService', () => {
  let service: TaskTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
