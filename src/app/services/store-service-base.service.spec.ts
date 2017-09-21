import { TestBed, inject } from '@angular/core/testing';

import { StoreServiceBaseService } from './store-service-base.service';

describe('StoreServiceBaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreServiceBaseService]
    });
  });

  it('should be created', inject([StoreServiceBaseService], (service: StoreServiceBaseService) => {
    expect(service).toBeTruthy();
  }));
});
