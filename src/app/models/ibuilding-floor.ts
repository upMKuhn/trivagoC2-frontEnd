import { Building } from "./building";
import { IBuilding } from "./ibuilding";

export interface IBuildingFloor {
    getFloorNumber(): number;
    getName(): string;
    getBuilding(): IBuilding;
    isValidModel():boolean;
}

