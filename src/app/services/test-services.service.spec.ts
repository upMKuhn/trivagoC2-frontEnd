import { TestBed, inject } from '@angular/core/testing';

import { TestServicesService } from './test-services.service';

describe('TestServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestServicesService]
    });
  });

  it('should be created', inject([TestServicesService], (service: TestServicesService) => {
    expect(service).toBeTruthy();
  }));
});
