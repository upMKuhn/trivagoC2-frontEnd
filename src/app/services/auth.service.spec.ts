import { HttpModule } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';
import { HttpBasicAuthClient } from './http-basic-auth-client.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [HttpBasicAuthClient, AuthService]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
