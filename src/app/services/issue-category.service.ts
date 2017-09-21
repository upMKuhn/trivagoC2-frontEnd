import { JsonApiQueryData } from 'angular2-jsonapi/dist';
import { IssueCategory } from './../models/IssueCategory';
import { DataStoreService } from './data-store.service';
import { Injectable } from '@angular/core';

@Injectable()
export class IssueCategoryService {

  private _categories:IssueCategory[] = [];
  constructor(private dataStore:DataStoreService) { 
    dataStore.findAll(IssueCategory).subscribe((data:JsonApiQueryData<IssueCategory>)=>{
      this._categories = data.getModels();
    })
  }
  
  public get Categories() :IssueCategory[] { return [].concat(this._categories);}

  public byName(name:string):IssueCategory|null{
    var categories = this._categories.filter((obj:IssueCategory)=>{
      return obj.theName == name;
    }); 
    return categories.length == 0 ? null: categories[0];
  }

}
