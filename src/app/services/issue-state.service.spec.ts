import { IssueStateService } from './issue-state.service';
import { TestBed, inject } from '@angular/core/testing';


describe('IssueStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IssueStateService]
    });
  });

  it('should be created', inject([IssueStateService], (service: IssueStateService) => {
    expect(service).toBeTruthy();
  }));
});
