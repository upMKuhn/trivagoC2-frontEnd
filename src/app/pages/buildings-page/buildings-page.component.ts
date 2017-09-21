import { IUser } from './../../models/iuser';
import { AddBuildingForm } from './../../components/building-card/AddBuildingForm';
import { DataStoreService } from './../../services/data-store.service';
import { AuthService } from './../../services/auth.service';
import { Utils } from './../../utils/utils';
import { BuildingService } from './../../services/building.service';
import { Building } from './../../models/building';
import { IBuilding } from './../../models/ibuilding';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buildings-page',
  templateUrl: './buildings-page.component.html',
  styleUrls: ['./buildings-page.component.scss']
})
export class BuildingsPageComponent implements OnInit {

  private buildings:IBuilding[]; 
  private user:IUser; 
  private authService:AuthService;
  private dataStore:DataStoreService;
  private onBuildingAdded:(building:Building)=>void;
  private onBuildingRemoved:(building:Building)=>void;
  constructor(buildingService:BuildingService, authService:AuthService, dataStore:DataStoreService) { 
    this.authService = authService;
    this.dataStore = dataStore;
    this.buildings = [];    
    buildingService.fetchAllWithFloors(Utils.makeCallback(this, this.setBuildings));
    authService.subscribe_Authenticated(Utils.makeCallback(this, this.setUser))
    this.onBuildingAdded = Utils.makeCallback(this, this.BuildingAdded);
    this.onBuildingRemoved = Utils.makeCallback(this, this.BuildingRemoved);
  }

  ngOnInit() {

  }


  BuildingAdded(buildinig:Building){
    this.buildings.push(buildinig);
    this.sortBuildings();
  }

  BuildingRemoved(buildinig:Building){
    this.buildings = this.buildings.filter((b:Building)=>{ 
      return b.getBuildingName() !== buildinig.getBuildingName()
      || b instanceof AddBuildingForm
    });
  }


  private sortBuildings(){
    this.buildings = this.buildings.sort( (a:IBuilding,b:IBuilding )=>{
      if(a instanceof AddBuildingForm)
        return 1
      if(b instanceof AddBuildingForm)
        return -1
      if (a.getBuildingName() < b.getBuildingName())
        return -1
      if (a.getBuildingName() > b.getBuildingName())
        return 1
      return 0
    });
  }

  private setBuildings(build:Building[]){ 
    this.buildings = build;
    this.pushBuildingFormIfNeeded();
    this.sortBuildings();
  }

  private setUser(user:IUser){ 
    this.user = user;
    this.pushBuildingFormIfNeeded();
  }

  private pushBuildingFormIfNeeded(){ 
    var canCreateBuildings = this.user != undefined && this.user.canUserCreateBuildings();
    var buildingFormNotPushedYet = this.buildings.filter(
        (building)=>{return building instanceof AddBuildingForm;})
      .length == 0;

    if(canCreateBuildings && buildingFormNotPushedYet){
      this.buildings.push(new AddBuildingForm(this.dataStore))
    }
  }



}
