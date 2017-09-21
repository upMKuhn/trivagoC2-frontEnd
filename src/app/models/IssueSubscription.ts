import { Issue } from './issue';
import { User } from './user';
import { DataStoreService } from './../services/data-store.service';
import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo, JsonApiDatastore } from 'angular2-jsonapi';

@JsonApiModelConfig({
    type: 'issueSubscribers'
})
export class IssueSubscription extends JsonApiModel  {
    
    @BelongsTo()
    private subscriber: User;

    @BelongsTo()
    private issue:Issue;

    get theIssue() : Issue {return this.issue;}
    get theSubscriber() : User {return this.subscriber;}

    public static create(dataStore:JsonApiDatastore, issue:Issue, user:User){
        var obj = new IssueSubscription(dataStore);
        obj.subscriber = user;
        obj.issue = issue;
        return obj;
    }
}

