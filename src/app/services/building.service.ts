import { Utils } from './../utils/utils';
import { Building } from './../models/building';
import { StoreServiceBaseService } from './store-service-base.service';
import { DataStoreService } from './data-store.service';
import { HttpBasicAuthClient } from './http-basic-auth-client.service';
import { Injectable } from '@angular/core';

@Injectable()
export class BuildingService extends StoreServiceBaseService {

  constructor(http:HttpBasicAuthClient, dataStore:DataStoreService) { 
    super(http, dataStore);
  }

  fetchAll(onSuccess:(buildings: Building[]) => void){
    this.dataStore.findAll(Building)
      .subscribe(Utils.makeCallback(this, this.onSuccessWrapper, onSuccess));
  }

  fetchAllWithFloors(onSuccess:(buildings: Building[]) => void){
    this.dataStore.findAll(Building,{
      include: 'floors.building,floors.issues,floors.issues.priority,floors.issues.state,floors.subscriptions'
    })
      .subscribe(Utils.makeCallback(this, this.onSuccessWrapper, onSuccess));
  }

  fetchWithFloors(id:string, onSuccess:(buildings: Building) => void){
    this.dataStore.findRecord(Building, id,{
      include: 'floors.building'
    })
      .subscribe(onSuccess);
  }

  

}
