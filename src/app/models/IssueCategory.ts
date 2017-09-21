import { DataStoreService } from './../services/data-store.service';
import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';

@JsonApiModelConfig({
    type: 'issueCategories'
})
export class IssueCategory extends JsonApiModel  {
    
    @Attribute()
    private categoryName: string;

    public get theName() { return this.categoryName;}

}

