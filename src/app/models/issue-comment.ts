import { DataStoreService } from './../services/data-store.service';
import { Issue } from './issue';
import { User } from './user';
import { JsonApiModel, Attribute, BelongsTo, JsonApiModelConfig, JsonApiDatastore } from 'angular2-jsonapi';
import { Utils } from "../utils/utils";


@JsonApiModelConfig({
    type: 'issueComments'
})
export class IssueComment extends JsonApiModel {

    private createdTimeAgo:string;
    
    @Attribute()
    private text:string;

    @Attribute()
    private createdAt:string;
  
    @Attribute()
    private updatedAt:string;

    @BelongsTo()
    private author:User;

    @BelongsTo()
    private issue:Issue;

    constructor(_datastore: JsonApiDatastore, data?: any){
        super(_datastore, data);
        this.updateTimeAgoFields();
    }
    
    public static create(store:DataStoreService, message:string, author:User, issue:Issue): IssueComment{
        var obj = new IssueComment(store);
        obj.author = author;
        obj.createdAt = new Date(Date.now()).toUTCString();
        obj.text = message;
        obj.issue = issue;
        obj.updateTimeAgoFields();
        return obj;
    }

    public get theText(){return this.text;}
    public set theText(value:string){this.text = value;}
    
    public get theAuthor():User{return this.author;}
    public set theAuthor(value:User){this.author = value;}
    
    public get postedAgo():string{return this.createdTimeAgo;}
    public get thePostedDate():string{return this.createdAt;}


    public updateTimeAgoFields(){
        if(this.createdAt != undefined)
            this.createdTimeAgo = Utils.dateToTimeSince(new Date(Date.parse(this.createdAt)));
    }
    

}
