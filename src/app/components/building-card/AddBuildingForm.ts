import { DataStoreService } from './../../services/data-store.service';
import { BuildingFloor } from './../../models/building-floor';
import { Building } from './../../models/building';
import { Utils } from './../../utils/utils';
import { FormGroup, FormControl, Validators, ValidatorFn, Validator, AbstractControl } from '@angular/forms';
import { IBuilding } from "../../models/ibuilding";

export class AddBuildingForm  extends FormGroup implements IBuilding {
    
    addFloor(floor: BuildingFloor) {
        throw new Error("AddBuildingForm - Method not implemented.");
    }


    private buildingName: string;
    private floors: BuildingFloor[];
    
    private buildingNameControl:FormControl;
    private dataStore:DataStoreService;
    constructor(dataStore:DataStoreService)
    {
        super({});
        this.dataStore = dataStore;
        this.floors = [];
        this.buildingNameControl = new FormControl("", [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(255),
        ]);
        super.addControl('buildingName', this.buildingNameControl)
    }

    isValidModel(): boolean {
        return false;
    }

    getBuildingName(): string {
        return this.buildingNameControl.value;
    }
    getFloors(): BuildingFloor[] {
        return this.floors;
    }

    clear(){
        this.buildingNameControl.setValue("");
        this.buildingNameControl.reset();
        this.reset();
    }

    toBuilding():Building{
        return Building.create(this.dataStore, this.getBuildingName());
    }

}
