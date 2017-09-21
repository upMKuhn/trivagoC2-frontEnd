import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DataStoreService } from './../services/data-store.service';
import { BuildingFloor } from './building-floor';
import { JsonApiModelConfig, Attribute, HasMany, BelongsTo, JsonApiModel } from 'angular2-jsonapi';
import { IBuilding } from "./ibuilding";
import { IBuildingFloor } from "./ibuilding-floor";

@JsonApiModelConfig({
    type: 'buildings',
})
export class Building extends JsonApiModel implements IBuilding {
    


    @Attribute({propertyName: "buildingName"})
    private buildingName: string;

    @HasMany()
    private floors: BuildingFloor[] = [];

    throwIfInvalid(){
        if(!this.isValidModel()){
        }
    }

    save(params?:any, headers?:Headers): Observable<this>
    {
        this.throwIfInvalid()
        return super.save(params, headers);
    }

    isValidModel(): boolean {
        return this.buildingName != undefined && this.buildingName.length > 3;
    }

    getBuildingName(): string { return this.buildingName; }
    getFloors(): BuildingFloor[] { return [].concat(this.floors); }
    addFloor(floor:BuildingFloor){ 
        var building = floor.getBuilding(); 
        if(building === this || building === undefined || building === null)
        {
            if(!this.floorSectionExsist(floor.getFloorNumber(), floor.getName()))
                this.floors.push(floor);
                building = this;
        }
    }

    floorSectionExsist(floorNumber:number, name:string){
        return this.floors.filter((floor:IBuildingFloor)=>{
            return floor.getFloorNumber() == floorNumber && floor.getName() == name;
        }).length != 0
    }

    public static create(service:DataStoreService, buildingName:string){
        var obj = new Building(service);
        obj.buildingName = buildingName;
        obj.floors = [];
        obj.throwIfInvalid();
        return obj;
    }
}


