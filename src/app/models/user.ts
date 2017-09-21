import { BuildingFloor } from './building-floor';
import { FloorSubscription } from './floor-subscription';
import { Issue } from './issue';
import { IssueSubscription } from './IssueSubscription';
import { IUser } from './iuser';
import { DataStoreService } from './../services/data-store.service';
import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo, JsonApiDatastore } from 'angular2-jsonapi';

@JsonApiModelConfig({
    type: 'users'
})
export class User extends JsonApiModel implements IUser {
    
    private ROLE_TYPES:any = {'USER':1 ,'HERO':2, 'ADMIN':4};

    @Attribute({ propertyName: "username" })
    private username: string;
    @Attribute({propertyName: "email"})
    private email: string;
    @Attribute({propertyName: "roleAsInt"})
    private roleAsInt:number;
    @HasMany()
    private issueSubscriptions:IssueSubscription[]=[];
    @HasMany()
    private floorSubscriptions:FloorSubscription[]=[];

    canUserAlterBuildings():boolean {  return this.isAdmin() }
    canUserCreateBuildings():boolean { return this.isAdmin() }

    constructor(private datastore: JsonApiDatastore, data?: any){
        super(datastore, data);
    }

    public static create(dataStore:DataStoreService, userName:string, email:string, role:number=1): User{
        var obj = new User(dataStore);
        obj.username = userName;
        obj.email = email;
        obj.roleAsInt = role;
        obj.issueSubscriptions = [];
        return obj;
    }

    getUsername(): string { return this.username;   }
    getEmail(): string { return this.email;    }
    getRoleAsInt(): number { return this.roleAsInt;  }

    isAdmin(){
        return (this.roleAsInt & this.ROLE_TYPES.ADMIN) > 0;
    }

    isHero(){
        return (this.roleAsInt & (this.ROLE_TYPES.ADMIN | this.ROLE_TYPES.HERO)) != 0;
    }


    isSubscribedToFloor(floor:BuildingFloor){
        return this.getFloorSubscriptionById(floor) != null;
    }
    isSubscribedToIssue(issue:Issue){
        return this.getIssueSubscriptionById(issue) != null;
    }


    subscribeFloor(floor:BuildingFloor){
        if(!this.isSubscribedToFloor(floor)){
            var subscription = FloorSubscription.create(this.datastore, floor, this);
            subscription.save().subscribe(()=>{
                this.floorSubscriptions.push(subscription);
            });
        }
    }

    unsubscribeFloor(floor:BuildingFloor){
        if(this.isSubscribedToFloor(floor)){
            var subscription = this.getFloorSubscriptionById(floor);
            this.datastore.deleteRecord(FloorSubscription, subscription.id).subscribe(() => {
                this.floorSubscriptions = this.floorSubscriptions.filter(obj => {
                    return obj.theFloor.id != floor.id;
                });
            })
        }
    }


    subscribeIssue(issue:Issue){
        if(!this.isSubscribedTo(issue)){
            var subscription = IssueSubscription.create(this.datastore, issue, this);
            subscription.save().subscribe(()=>{
                this.issueSubscriptions.push(subscription);
            });
        }
    }

    unsubscribeIssue(issue:Issue){
        if(this.isSubscribedToIssue(issue)){
            var subscription = this.getIssueSubscriptionById(issue);
            this.datastore.deleteRecord(FloorSubscription, subscription.id).subscribe(() => {
                this.issueSubscriptions = this.issueSubscriptions.filter(obj => {
                    return obj.theFloor.id != issue.id;
                });
            })
        }
    }


    private getFloorSubscriptionById(floor:BuildingFloor){
        var subset =  this.floorSubscriptions.filter(obj => {
            return obj.theFloor.id == floor.id;
        });
        return subset.length > 0 ? subset[0] : null;
    }
    private getIssueSubscriptionById(issue:Issue){
        var subset =  this.floorSubscriptions.filter(obj => {
            return obj.theFloor.id == issue.id;
        });
        return subset.length > 0 ? subset[0] : null;
    }

}

