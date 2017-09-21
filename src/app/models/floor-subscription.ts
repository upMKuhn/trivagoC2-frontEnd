import { BuildingFloor } from './building-floor';
import { Building } from './building';
import { Issue } from './issue';
import { User } from './user';
import { DataStoreService } from './../services/data-store.service';
import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo, JsonApiDatastore } from 'angular2-jsonapi';

@JsonApiModelConfig({
    type:'floorSubscriptions'
})
export class FloorSubscription extends JsonApiModel  {
    
    @BelongsTo()
    private subscriber: User;
    @BelongsTo()
    private floor:BuildingFloor;

    get theSubscriber() : User {return this.subscriber;}
    get theFloor() : BuildingFloor {return this.floor;}

    public static create(dataStore:JsonApiDatastore, floor:BuildingFloor, user:User){
        var obj = new FloorSubscription(dataStore);
        obj.subscriber = user;
        obj.floor = floor;
        return obj;
    }
}

