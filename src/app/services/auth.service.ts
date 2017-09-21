import { JsonApiQueryData } from 'angular2-jsonapi/dist';
import { Observable } from 'rxjs/Observable';
import { DataStoreService } from './data-store.service';
import { User } from './../models/user';
import { UserService } from './user.service';
import { Utils } from './../utils/utils';
import { UserCredentials } from './../components/login/UserCredentials';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpBasicAuthClient } from "./http-basic-auth-client.service";
import { environment } from "../../environments/environment";
import { IUser } from "../models/iuser";

@Injectable()
export class AuthService {

  private client:HttpBasicAuthClient;
  private user:User|null;
  private onAuthenticated:EventEmitter<IUser>;
  private authenticated:boolean;
  constructor(basicAuthClient:HttpBasicAuthClient, private userStore:UserService ) { 
    this.client = basicAuthClient;
    this.onAuthenticated = new EventEmitter<IUser>(true);
    this.user = null;
  }

  public login(userCred:UserCredentials,onSuccess, OnFailure=undefined, OnComplete=undefined){
    window.localStorage.user = userCred.userIdentifier; 
    this.client.setCredentials(userCred);
    this.testAuthentification_loginCall(userCred.userIdentifier, onSuccess, OnFailure, OnComplete);
  }

  /** get the information stored in session*/
  public getUser() : User | null { 
    var userSessionObj = window.localStorage.getItem('user');
    if(this.user == null && userSessionObj){
      var obj = JSON.parse(userSessionObj);
      this.user = User.create(null ,obj['_username'], obj['_email'], obj['_roleAsInt']);
      this.user.id = obj['id'];
      this.testAuthentification_loginCall(this.user.getUsername());
    }
    return this.user;
  }

  public subscribe_Authenticated(callback: (IUser) => void){
    this.onAuthenticated.subscribe(callback);
  }


  private testAuthentification_loginCall(userIdentifier:string,onSuccess=undefined, OnFailure=undefined, OnComplete=undefined){
    var url = '/api/login/' + userIdentifier;
    this.client.get(url)
      .subscribe(
        Utils.makeCallback(this, this.onAuthTestSucess, Utils.getOrDefault(onSuccess, function(){})),
        Utils.makeCallback(this, this.onAuthTestError, Utils.getOrDefault(OnFailure, function(){})),
        Utils.makeCallback(this, this.onAuthTestCompleted, Utils.getOrDefault(OnComplete, function(){}),
    ));
  }


  private onAuthTestCompleted(nextCallBack){
      nextCallBack();
  }

  private onAuthTestError(response:Response, nextCallBack){
    this.user = null;
    window.localStorage.removeItem('user');  
    nextCallBack();
  }

  private onAuthTestSucess(response:Response, nextCallBack){
    this.setUser(response.json());
    nextCallBack(this.user);
    window.localStorage.setItem('user', JSON.stringify(this.user));
    this.onAuthenticated.emit(this.user);
  }

  private setUser(obj:object){
    this.user = User.create(null ,obj['username'], obj['email'], obj['rolesAsInt']);
    this.user.id = obj['id'];
  }
}

