import { TestBed, inject } from '@angular/core/testing';

import { IssueCategoryService } from './issue-category.service';

describe('IssueCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IssueCategoryService]
    });
  });

  it('should be created', inject([IssueCategoryService], (service: IssueCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
