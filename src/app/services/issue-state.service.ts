import { JsonApiQueryData } from 'angular2-jsonapi/dist';
import { IssueState } from './../models/IssueState';
import { DataStoreService } from './data-store.service';
import { HttpBasicAuthClient } from './http-basic-auth-client.service';
import { Injectable } from '@angular/core';

@Injectable()
export class IssueStateService {

  private states:IssueState[]= [];
  constructor(private http:HttpBasicAuthClient, private dataStore:DataStoreService) { 
    var cachedItem:{data:any, expiery:Date}
    if(window.localStorage.getItem('issueStates')){
      cachedItem = <{data:any, expiery:Date}>JSON.parse(window.localStorage.getItem('issueStates'));
    }
    if(cachedItem && cachedItem.expiery > new Date(Date.now())){
      this.states = cachedItem.data
    } else{
      dataStore.findAll(IssueState).subscribe((states:JsonApiQueryData<IssueState>) =>{
        this.states = states.getModels();
      });
    }
  }

  public getCreatedCategory(){ 
    return this.states.filter((obj:IssueState) =>{
      return obj.isInOpenState();
    })[0];
  }

  public getBlockedCategory(){ 
    return this.states.filter((obj:IssueState) =>{
      return obj.isBlocked();
    })[0];
  }

  public getProgressCategory(){ 
    return this.states.filter((obj:IssueState) =>{
      return obj.isProgressing();
    })[0];
  }

  public getResolveCategory(){ 
    return this.states.filter((obj:IssueState) =>{
      return obj.isResolved();
    })[0];
  }

  private getStatesFromSessionStorageOrFetch(){

  }


}
