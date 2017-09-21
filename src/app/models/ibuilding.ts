import { BuildingFloor } from './building-floor';
export interface IBuilding{
    getBuildingName():string;
    getFloors(): BuildingFloor[];
    addFloor(floor:BuildingFloor);
    isValidModel():boolean
}