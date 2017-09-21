import { DataStoreService } from './../../services/data-store.service';
import { BuildingFloor } from './../../models/building-floor';
import { Building } from './../../models/building';
import { Utils } from './../../utils/utils';
import { FormGroup, FormControl, Validators, ValidatorFn, Validator, AbstractControl } from '@angular/forms';
import { IBuilding } from "../../models/ibuilding";
import { IBuildingFloor } from "../../models/ibuilding-floor";

export class AddFloorForm  extends FormGroup implements  IBuildingFloor {
    


    private floorNumber: number;
    private building:Building;
    public floorNumberControl:FormControl;
    public floorNameControl:FormControl;
    private dataStore:DataStoreService;
    constructor(building:Building, dataStore:DataStoreService)
    {
        super({});
        this.building = building;
        this.dataStore = dataStore;
        this.floorNumberControl = new FormControl("", [
            Validators.required,
            Validators.min(-1),
            Validators.max(10),
            Validators.pattern(/^\d+$/),
        ]);
        this.floorNameControl = new FormControl("", [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(255),
        ]);
        super.addControl('floorNumber', this.floorNumberControl)
        super.addControl('floorName', this.floorNameControl)
    }
    
    getName(): string { return ""; }
    getFloorNumber(): number { return this.floorNumber; }
    getBuilding(): Building { return <Building>this.building; }

    registerOnValidatorChange?(fn: () => void): void {
        throw new Error("Method not implemented.");
    }

    toBuildingFloor() : BuildingFloor{
        return BuildingFloor.create(this.dataStore, this.building, this.floorNameControl.value, this.floorNumberControl.value);
    }

    isValidModel(): boolean {
        return false;
    }

    clear(){
        this.floorNameControl.setValue("");
        this.floorNumberControl.setValue("");
    }
}
