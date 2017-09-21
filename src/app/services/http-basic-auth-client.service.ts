import { ResponseOptions } from '@angular/http';
import { Http, XHRBackend, RequestOptions, Headers } from '@angular/http';
import { Utils } from './../utils/utils';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { UserCredentials } from "../components/login/UserCredentials";

@Injectable()
export class HttpBasicAuthClient extends Http {

  private user:UserCredentials; 

  
  constructor(backend:XHRBackend, _defaultOptions: RequestOptions) { 
    super(backend, _defaultOptions);
  }

  public setCredentials(user:UserCredentials){
    this.user = user;
    this.setAuthDefaultHeader();
  }
  
  
  private setAuthDefaultHeader() {
    if(this.user != undefined) 
    {
      var headers = new Headers();
      headers.append('Authorization', 
        'Basic ' + btoa(this.user.userIdentifier + ':' + this.user.password)
      ); 
      this._defaultOptions = this._defaultOptions.merge({
          'headers': headers
      });
    }
  }
} 