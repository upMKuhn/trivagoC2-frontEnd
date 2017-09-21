import { DataStoreService } from './data-store.service';
import { HttpBasicAuthClient } from './http-basic-auth-client.service';
import { Injectable } from '@angular/core';
import { JsonApiQueryData } from "angular2-jsonapi/dist";

@Injectable()
export class StoreServiceBaseService {

  protected http:HttpBasicAuthClient;
  protected dataStore:DataStoreService;
  constructor(http:HttpBasicAuthClient, dataStore:DataStoreService) {
    this.http = http;
    this.dataStore = dataStore;
  }

  onSuccessWrapper(queryData:JsonApiQueryData<any>, nextCallback){
    nextCallback(queryData.getModels());
  }
}
