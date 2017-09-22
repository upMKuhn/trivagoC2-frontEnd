import { IssueSubscription } from './../models/IssueSubscription';
import { Headers } from '@angular/http';
import { Utils } from './../utils/utils';
import { IssueComment } from './../models/issue-comment';
import { Observable } from 'rxjs/Observable';
import { IssuePriority } from './../models/IssuePriority';
import { IssueState } from './../models/IssueState';
import { IssueCategory } from './../models/IssueCategory';
import { Issue } from './../models/issue';
import { BuildingFloor } from './../models/building-floor';
import { User } from './../models/user';
import { Building } from './../models/building';
import { HttpBasicAuthClient } from './http-basic-auth-client.service';
import { Injectable } from '@angular/core';

import { JsonApiDatastoreConfig, JsonApiDatastore, JsonApiModel,JsonApiQueryData, ModelType } from 'angular2-jsonapi';
import { FloorSubscription } from "../models/floor-subscription";

@Injectable()
@JsonApiDatastoreConfig({
  baseUrl: '/api/db/',
  models: {
    users: User,
    buildings: Building,
    'BuildingFloor': BuildingFloor,
    issues: Issue,
    issueCategories: IssueCategory,
    issueStates: IssueState,
    issuePriorities: IssuePriority,
    issueSubscribers:IssueSubscription,
    issueComments: IssueComment,
    floorSubscriptions:FloorSubscription
  }
})
export class DataStoreService extends JsonApiDatastore{

  private cacheCollectionsMap:{
      typeAndParams:{
        lastRefreshAt:Date,
        isRequestPending: boolean,
        lastRequest:any
      }
   };
  private cacheDuration:Date; 
  constructor(http:HttpBasicAuthClient) { 
    super(http); 
    this.cacheCollectionsMap = {typeAndParams:undefined};
    this.cacheDuration = new Date(0);
    this.cacheDuration.setMinutes(5);
  }

  getFloorWithIssues(id:string): Observable<BuildingFloor>{
    return this.findRecord(BuildingFloor, id, {
      include: 'issues,building,issues.priority,issues.state,issues.category'
    });
  }
  
}
