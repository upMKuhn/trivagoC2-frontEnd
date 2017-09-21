import { TestBed, inject } from '@angular/core/testing';

import { IssuePriorityService } from './issue-priority.service';

describe('IssuePriorityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IssuePriorityService]
    });
  });

  it('should be created', inject([IssuePriorityService], (service: IssuePriorityService) => {
    expect(service).toBeTruthy();
  }));
});
