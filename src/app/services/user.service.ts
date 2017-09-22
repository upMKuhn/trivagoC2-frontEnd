import { StoreServiceBaseService } from './store-service-base.service';
import { JsonApiQueryData } from 'angular2-jsonapi/dist';
import { DataStoreService } from './data-store.service';
import { HttpBasicAuthClient } from './http-basic-auth-client.service';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Utils } from "../utils/utils";
import { IUser } from "../models/iuser";
import { User } from '../models/user';

@Injectable()
export class UserService extends StoreServiceBaseService {

  constructor(http:HttpBasicAuthClient, dataStore:DataStoreService) {
    super(http, dataStore);
  }

  fetchAll(onSuccess:(users: IUser[]) => void){
    this.dataStore.findAll(User)
      .subscribe(Utils.makeCallback(this, this.onSuccessWrapper, onSuccess));
  }

  byUserIdentifier(userIdentifier:String){
    this.dataStore.findAll(User, {
      eq: { username: userIdentifier},
    })
  }

  fetchOrPeekWithSubscriptions(userId:string){
    
    var user = this.dataStore.peekRecord(User, userId);
    var userObservable:Observable<User>;
    if(user){
      userObservable = new Observable<User>((observer)=>{
        observer.next(user);
      });
    }else{
      userObservable = this.dataStore.findRecord(User, userId, {
        include: 'issueSubscriptions.subscriber,issueSubscriptions.issue,floorSubscriptions.subscriber,floorSubscriptions.floor'
      })
    }

    return userObservable;
  }

  register(user:User, password:string, onSuccess:(user:User)=>void) {
    this.http.post('/auth/register', {
     username: user.getUsername(), 
     password: password, 
     email: user.getEmail(), 
    }).subscribe((response) => {
        var data = response.json();
        user.id = data['id'];
        onSuccess(user);
    });
  }
  
}
