import { JsonApiQueryData } from 'angular2-jsonapi/dist';
import { IssuePriority } from './../models/IssuePriority';
import { Injectable } from '@angular/core';
import { DataStoreService } from "./data-store.service";

@Injectable()
export class IssuePriorityService {

  private _priorities:IssuePriority[] = [];
  constructor(private dataStore:DataStoreService) { 
    dataStore.findAll(IssuePriority).subscribe((data:JsonApiQueryData<IssuePriority>)=>{
      this._priorities = data.getModels();
    })
  }
  
  public get Priorities() :IssuePriority[] { return [].concat(this._priorities);}

  public byName(name:string):IssuePriority|null{
    var priorities = this._priorities.filter((obj:IssuePriority)=>{
      return obj.theName == name;
    }); 
    return priorities.length == 0 ? null: priorities[0];
  }


}
