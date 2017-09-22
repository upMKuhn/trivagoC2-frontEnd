import { AddBuildingForm } from './AddBuildingForm';
import { AddFloorForm } from './../floor-card/AddFloorForm';
import { DataStoreService } from './../../services/data-store.service';
import { Utils } from './../../utils/utils';
import { BuildingFloor } from './../../models/building-floor';
import { AuthService } from './../../services/auth.service';
import { Building } from './../../models/building';
import { User } from './../../models/user';
import { BuildingService } from './../../services/building.service';
import { Component, OnInit, Input } from '@angular/core';
import { IBuilding } from "../../models/ibuilding";
import { IBuildingFloor } from "../../models/ibuilding-floor";

@Component({
  selector: 'app-building-card',
  templateUrl: './building-card.component.html',
  styleUrls: ['./building-card.component.scss']
})
export class BuildingCardComponent implements OnInit {

  isAddBuildingForm:boolean;

  @Input('building')
  public building:IBuilding;
  @Input('onBuildingAdded')
  private onBuildingAdded:(building:Building)=>void;
  @Input('onBuildingRemoved')
  private onBuildingRemoved:(building:Building)=>void;
  public floors;
  private floorKeys = [];

  private onFloorAdded:Function;
  private onFloorRemoved:Function;

  private canBuildingBeRemoved:boolean;
  private addBuildingForm:AddBuildingForm;
  private loggedInUser:User;
  constructor(private auth:AuthService, private dataStore:DataStoreService, private buildingService:BuildingService) {
    this.floors = {};
    this.onFloorAdded = Utils.makeCallback(this,this.floorAdded);
    this.onFloorRemoved = Utils.makeCallback(this,this.floorRemoved);
    this.loggedInUser = auth.getUser();
  }

  ngOnInit() {
    this.isAddBuildingForm = this.building instanceof AddBuildingForm;

    if(this.isAddBuildingForm)
      this.addBuildingForm = <AddBuildingForm>this.building;    

    this.extractFloors();
    this.pushFloorForm();
    this.sortFloors();
    this.updateCanBuildingBeRemoved();
  }

  floorAdded(newFloor:BuildingFloor) {
    this.building.addFloor(newFloor);
    this.floors[newFloor.getFloorNumber()] = Utils.getOrDefault(this.floors[newFloor.getFloorNumber()], []);
    this.floors[newFloor.getFloorNumber()].push(newFloor);
    this.floors[newFloor.getFloorNumber()].key = newFloor.getFloorNumber();
    this.floorKeys = Object.keys(this.floors);
    this.updateCanBuildingBeRemoved();
  }

  floorRemoved(removedFloor:BuildingFloor){

    this.floors[removedFloor.getFloorNumber()] = Utils.getOrDefault(this.floors[removedFloor.getFloorNumber()], []);
    this.floors[removedFloor.getFloorNumber()] = this.floors[removedFloor.getFloorNumber()].filter((floor:IBuildingFloor)=>{
      return floor.getName() != removedFloor.getName();
    });
    this.floors[removedFloor.getFloorNumber()].key = removedFloor.getFloorNumber();
    if(this.floors[removedFloor.getFloorNumber()].length == 0)
      delete this.floors[removedFloor.getFloorNumber()];
    
    this.buildingService.fetchWithFloors((<Building>this.building).id, Utils.makeCallback(this, this.setBuilding));
    this.floorKeys = Object.keys(this.floors);
  }

  sortFloors(){
     for(var floorNumber in this.floors){
        if(Number(floorNumber) != NaN)
        {
          this.floors[floorNumber].sort((a:IBuildingFloor, b:IBuildingFloor) =>{
            if (a.getName() < b.getName())
              return -1
            if (a.getName() > b.getName())
              return 1
            return 0
          });
        }
     }
  }

  removeBuilding(){
    if(!this.isAddBuildingForm && this.canBuildingBeRemoved)
    {
      var form = <AddBuildingForm>this.building;
      this.dataStore.deleteRecord(Building, (<Building>this.building).id)
      .subscribe(()=>{
        this.onBuildingRemoved(<Building>this.building);
      }, (error)=>{ console.log("Error while removing floor: ", error)});
    }
  }

  addBuilding(){
    if(this.isAddBuildingForm){
      var form = <AddBuildingForm>this.building;
      if(!form.invalid){
        var newBuilding = form.toBuilding();
        newBuilding.save().subscribe(()=>{
          this.onBuildingAdded(newBuilding);
          form.clear();
        })
      }
    }
  }


  pushFloorForm(){
    if(!this.isAddBuildingForm && this.auth.getUser().canUserAlterBuildings()){
      this.floors['_floorForm'] = [];
      this.floors['_floorForm'].push(new AddFloorForm(<Building>this.building, this.dataStore));
      this.sortFloors();
    }
    this.floorKeys = Object.keys(this.floors);
  }
  /** Utility for NgFor */
  isNumeric(obj:any){
    return !isNaN(Number(obj));
  }

  private extractFloors(){
    this.floors = Utils.getOrDefault(this.floors, {});
    
    var floorArray = this.building.getFloors();
    for(var i = 0; i < floorArray.length; i++){
      var floor = floorArray[i];
      var floorNumber = Utils.getOrDefault(floor.getFloorNumber(), "");
      var floorName = Utils.getOrDefault(floor.getName(), "")
      this.floors[floorNumber] = Utils.getOrDefault(this.floors[floorNumber], []);
      this.floors[floorNumber].key = floorNumber;
      this.floors[floorNumber].push(floor);
    }
    this.floorKeys = Object.keys(this.floors);
    this.updateCanBuildingBeRemoved();
  }

  private updateCanBuildingBeRemoved(){
      this.canBuildingBeRemoved = this.building.getFloors().length === 0;
  }

  private setBuilding(building:Building){
    this.building = building;
    this.updateCanBuildingBeRemoved();
  }

}
