import { DataStoreService } from './../services/data-store.service';
import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';

@JsonApiModelConfig({
    type: 'issuePriorities'
})
export class IssuePriority extends JsonApiModel  {
    
    @Attribute()
    private name: string;
    @Attribute()
    private needToActionValue: number;

    public get theName() : String{
        return this.name;
    }

    public getActionValue() : Number {
        return this.needToActionValue;
    }

    public toMaterialIcon() : string{
        var issueIcon = '';

        switch(this.needToActionValue){
            
            case 8:
                issueIcon = 'error';
                break;
            case 4:
                issueIcon = 'priority_high';
                break;
            case 2:
            case 1:
            default:
                issueIcon = 'bookmark';
                break;
        }
        return issueIcon;
    }

    public toCssClass() : Object{
        var issueIcon = '';
        switch(this.needToActionValue){
            
            case 8:
                issueIcon = 'ui-critical-icon';
                break;
            case 4:
                issueIcon = 'ui-high_priority-icon';
                break;
            case 2:
            case 1:
            default:
                issueIcon = 'ui-standard_priority-icon';
                break;
        }
        return [issueIcon];
    }
}

