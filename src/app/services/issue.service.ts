import { Utils } from './../utils/utils';
import { Observable } from 'rxjs/Observable';
import { JsonApiQueryData } from 'angular2-jsonapi/dist';
import { IssueStateService } from './issue-state.service';
import { Issue } from './../models/issue';
import { StoreServiceBaseService } from './store-service-base.service';
import { DataStoreService } from './data-store.service';
import { HttpBasicAuthClient } from './http-basic-auth-client.service';
import { Injectable } from '@angular/core';

@Injectable()
export class IssueService  {

  constructor(private http:HttpBasicAuthClient, private dataStore:DataStoreService, private stateService:IssueStateService) { 
  }

  public getStore(): DataStoreService{return this.dataStore;}

  public getIssueWithComments(id:string, ) : Observable<Issue>  {
    return this.dataStore.findRecord(Issue, id,{
      include: 'comments,comments.author'
    });
  }

  public blockIssue(issue:Issue) : Observable<Issue> {
    issue.theState = this.stateService.getBlockedCategory();
    issue = issue.clone(this.dataStore);
    return issue.save({
    });
  }
  
  public progressIssue(issue:Issue) : Observable<Issue>{
    issue.theState = this.stateService.getProgressCategory();
    issue = issue.clone(this.dataStore);    
    return issue.save({
    });
  }

  public resolveIssue(issue:Issue) : Observable<Issue>{
    issue.theState = this.stateService.getResolveCategory();
    issue = issue.clone(this.dataStore); 
    return issue.save({
    });
  }


  public getIssuesForFloorByState(id:string, state:string){
    return this.dataStore.findAll<Issue>(Issue,{
      include: 'priority,state,category,floor,creator,comments,subscriptions,subscriptions.subscriber',
      'filters[1][type]': 'eq',
      'filters[1][value]': id,
      'filters[1][path]': 'floor.id',

      'filters[0][type]': 'eq',
      'filters[0][value]': state,
      'filters[0][path]': 'state.name'
    });
  }

  public getOpenIssuesForFloor(id:string){

    return this.dataStore.findAll(Issue,{
      include: 'priority,state,category,floor,creator,comments,comments.author,subscriptions,subscriptions.subscriber',
      'filters[1][type]': 'eq',
      'filters[1][value]': id,
      'filters[1][path]': 'floor.id',

      'filters[0][type]': 'eq',
      'filters[0][value]': '0',
      'filters[0][path]': 'state.asNumber'
    });
  }

  public getProgressingIssuesForFloor(id:string){
    return this.dataStore.findAll(Issue,{
      include: 'priority,state,category,floor,creator,comments,comments.author,subscriptions,subscriptions.subscriber',
      'filters[1][type]': 'eq',
      'filters[1][value]': id,
      'filters[1][path]': 'floor.id',

      'filters[0][type]': 'eq',
      'filters[0][value]': '1',
      'filters[0][path]': 'state.asNumber'
    });
  }

  public getBlockedIssuesForFloor(id:string){
    return this.dataStore.findAll(Issue,{
      include: 'priority,state,category,floor,creator,comments,comments.author,subscriptions,subscriptions.subscriber',
      'filters[1][type]': 'eq',
      'filters[1][value]': id,
      'filters[1][path]': 'floor.id',

      'filters[0][type]': 'eq',
      'filters[0][value]': '2',
      'filters[0][path]': 'state.asNumber'
    });
  }

  public getClosedIssuesForFloor(id:string){
    return this.dataStore.findAll(Issue,{
      include: 'priority,state,category,floor,creator,comments,comments.author,subscriptions,subscriptions.subscriber',
      'filters[1][type]': 'eq',
      'filters[1][value]': id,
      'filters[1][path]': 'floor.id',

      'filters[0][type]': 'eq',
      'filters[0][value]': '3',
      'filters[0][path]': 'state.asNumber'
    });
  }

}
