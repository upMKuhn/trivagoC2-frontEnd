
export interface IUser{
    getUsername():string;
    getEmail():string;
    getRoleAsInt():number;

    canUserAlterBuildings():boolean;
    canUserCreateBuildings():boolean;
}