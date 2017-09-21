import { HttpModule } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';
import { HttpBasicAuthClient } from "./http-basic-auth-client.service";
import { UserCredentials } from "../components/login/UserCredentials";

describe('HttpBasicAuthClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [HttpBasicAuthClient]
    });
  });

  it('should be created', inject([HttpBasicAuthClient], (service: HttpBasicAuthClient) => {
    expect(service).toBeTruthy();
  }));
});
