import { User } from './user';
import { FloorSubscription } from './floor-subscription';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DataStoreService } from './../services/data-store.service';
import { Building } from './building';
import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo, JsonApiDatastore } from 'angular2-jsonapi';
import { Issue } from "./issue";
import { IBuildingFloor } from "./ibuilding-floor";

@JsonApiModelConfig({
    type: 'BuildingFloor'
})
export class BuildingFloor extends JsonApiModel implements IBuildingFloor{
   
    constructor(private datastore: JsonApiDatastore, data?: any) {
        super(datastore, data);
    }


    public static create(store:DataStoreService, building:Building, floorName:string, floorNumber:number) : BuildingFloor{
        var obj = new BuildingFloor(store);
        obj.building = building;
        obj.floorName = floorName;
        obj.floorNumber = floorNumber;
        return obj;
    }

    @Attribute({propertyName: "floorNumber"})
    private floorNumber: number;
    @Attribute({propertyName: "floorName"})
    private floorName: string;
    @BelongsTo()
    private building: Building;
    @HasMany()
    issues: Issue[] = [];

    @HasMany()
    private subscriptions:FloorSubscription[]=[];

    getName(): string { return this.floorName;}
    getFloorNumber(): number { return this.floorNumber;}
    getBuilding(): Building { return this.building; }
    getIssues(): Issue[] { return [].concat(this.issues); }


    get numberOfDoneIssues() :number{
        var count = 0;
        this.issues.forEach(obj=>{
            if(obj.theState.isResolved())
                count++;
        });
        return count;
    }

    get numberOfQueuedIssues() :number{
        var count = 0;
        this.issues.forEach(obj=>{
            if(obj.theState.isBlocked() || obj.theState.isInOpenState())
                count++;
        });
        return count;
    }

    throwIfInvalid(){
        if(this.building.floorSectionExsist(this.floorNumber, this.floorName)){
            throw new Error('The floor '  + this.floorNumber.toString() + " in building " + this.building.getBuildingName() + ' is not unique!');
        }
    }

    isValidModel(){
        return this.building != undefined && this.isFloorNumberUnique();
    }
    
    sortIssuesByUrgency(){
        this.issues = this.issues.sort((a:Issue, b:Issue) => {
            var a_priority = a.thePriority;
            var b_priority = b.thePriority;
            if(a_priority.getActionValue() == b_priority.getActionValue()){
                return 0;
            } else if(a_priority.getActionValue() > b_priority.getActionValue()){
                return -1;
            }else if(a_priority.getActionValue() < b_priority.getActionValue()){
                return 1;
            }
        });
    }
    
}


