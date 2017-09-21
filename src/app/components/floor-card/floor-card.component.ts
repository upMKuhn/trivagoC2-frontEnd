import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { User } from './../../models/user';
import { Router } from '@angular/router';
import { DataStoreService } from './../../services/data-store.service';
import { BuildingFloor } from './../../models/building-floor';
import { Component, OnInit, Input } from '@angular/core';
import { AddFloorForm } from "./AddFloorForm";
import { Building } from "../../models/building";
import { Subject } from "rxjs/Subject";

@Component({
  selector: 'app-floor-card',
  templateUrl: './floor-card.component.html',
  styleUrls: ['./floor-card.component.scss']
})
export class FloorCardComponent implements OnInit {

  //
  isFormCard:boolean;

  @Input('floor')
  private floor:BuildingFloor;

  @Input('building')
  private building:Building;

  @Input('floorAdded')
  floorAdded:(floor:BuildingFloor) => void

  @Input('floorRemoved')
  floorRemoved:(floor:BuildingFloor) => void

  private addFloorForm:AddFloorForm;
  private loggedInUser:User;
  constructor(private dataStore:DataStoreService, private router:Router, private userService:UserService, private auth:AuthService) {
    this.loggedInUser = auth.getUser();
  }

  ngOnInit() {
    this.isFormCard = this.floor instanceof AddFloorForm;

    if(this.isFormCard)
      this.addFloorForm = new AddFloorForm(this.building, this.dataStore);
    
  }

  remove(){
    this.dataStore.deleteRecord(BuildingFloor, this.floor.id)
    .subscribe(()=>{
      this.floorRemoved(this.floor);
    }, (error)=>{ console.log("Error while removing floor: ", error)});
  }

  submitAddFloorForm(){
    var floor = this.addFloorForm.toBuildingFloor();
    var floorUnique = !this.building.floorSectionExsist(floor.getFloorNumber(), floor.getName());
    if(this.addFloorForm.valid && floorUnique){
      floor.save().subscribe(()=>{
        this.floorAdded(floor); 
        this.addFloorForm.clear();
      }, (error)=>{ console.log("Error while adding floor: ", error)});
    }
  }

  navigateToFloor(){
    if(this.floor != undefined &&  this.floor instanceof BuildingFloor && this.floor.id != undefined){
      this.router.navigate(['floor', this.floor.id]);
    }
  }

}
