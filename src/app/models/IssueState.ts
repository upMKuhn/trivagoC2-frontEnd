import { DataStoreService } from './../services/data-store.service';
import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';

@JsonApiModelConfig({
    type: 'issueStates'
})
export class IssueState extends JsonApiModel  {
    
    @Attribute()
    private name: string;
    @Attribute()
    private asNumber: number;

    public isInOpenState():boolean{
        return this.asNumber == 0
    }

    public isBlocked():boolean{
        return this.asNumber == 2
    }

    public isProgressing():boolean{
        return this.asNumber == 1
    }
    

    public isResolved():boolean{
        return this.asNumber == 3
    }
}

