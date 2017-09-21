import { IssueSubscription } from './IssueSubscription';
import { Utils } from './../utils/utils';
import { IssueComment } from './issue-comment';
import { User } from './user';
import { Observable } from 'rxjs/Observable';
import { BuildingFloor } from './building-floor';
import { IssueState } from './IssueState';
import { IssuePriority } from './IssuePriority';
import { IssueCategory } from './IssueCategory';
import { DataStoreService } from './../services/data-store.service';
import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo, JsonApiDatastore } from 'angular2-jsonapi';

@JsonApiModelConfig({
    type: 'issues'
})
export class Issue extends JsonApiModel {
    
    private createdTimeAgo:string;

    @Attribute()
    private title: string;
    @Attribute()
    private location: string;
    @Attribute()
    private createdAt: string;
    @Attribute()
    private updatedAt: string;
    
    @BelongsTo()
    private floor: BuildingFloor;

    @BelongsTo()
    private category: IssueCategory;
    @BelongsTo()
    private priority: IssuePriority;
    @BelongsTo()
    private state: IssueState;
    @BelongsTo()
    private creator: User;

    @HasMany()
    private comments:IssueComment[]=[];

    @HasMany()
    private subscriptions:IssueSubscription[]=[];

    constructor(protected datastore: JsonApiDatastore, data?: any){
        super(datastore, data);
        this.updateTimeAgoFields();
    }

    public static create(store:JsonApiDatastore,title:string,
        location:string, 
        floor:BuildingFloor, 
        category:IssueCategory, 
        priority:IssuePriority, 
        state:IssueState,
        creator:User
    ):Issue{
        var obj = new Issue(store);
        if(!floor.id)
            console.error("Can not create a new Issue, if the floor provided has no id!", floor);

        obj.title = title;
        obj.location = location;
        obj.floor = floor;

        obj.category = category;
        obj.priority = priority;
        obj.state = state;
        obj.creator = creator;
        return obj;
    }

    get theTitle():string { return this.title; }
    set theTitle(title:string){ this.title = title; }

    get theLocation():string { return this.location; }
    set theLocation(location:string){ this.location = location; }

    get createdAtDate():Date { return new Date(Date.parse(this.createdAt)); }
    get updatedAtDate():Date { return new Date(Date.parse(this.updatedAt)); }
    
    get theFloor():BuildingFloor { return this.floor; }
    set theFloor(floor:BuildingFloor) { this.floor = floor; }

    get theCategory():IssueCategory { 
        return this.category;
     }
    set theCategory(category:IssueCategory){ 
        this.category = category;
    }

    get thePriority():IssuePriority { return this.priority; }
    set thePriority(Priority:IssuePriority){ this.priority = Priority; }

    get theState():IssueState { return this.state; }
    set theState(state:IssueState){ this.state = state; }

    get theComments():IssueComment[] { 
        return this.comments; 
    }
    set theComments(comment:IssueComment[]){ this.comments = comment; }


    public updateTimeAgoFields(){
        this.createdTimeAgo =  Utils.dateToTimeSince(this.createdAtDate);
    }
    
    public clearRelationships(){
        delete this.comments;
        delete this.creator;
    }

    public canBeDeleted(user:User){
        return  user && (user.isHero() || (this.creator.id == user.id && this.state.isInOpenState()));
    }

    public clone(dataStore:DataStoreService){
        var obj = Issue.create(dataStore,
            this.theTitle, 
            this.theLocation, 
            this.theFloor, 
            this.theCategory, 
            this.thePriority, 
            this.state, 
            this.creator
        );
        obj.id = this.id;
        return obj;
    }

    private _isSubscriber:boolean=null;
    public isSubscriber(user:User){
        if(this._isSubscriber == null)
            this._isSubscriber = this.subscriptions.filter((other:IssueSubscription) =>{  return other.theSubscriber.id == user.id }).length > 0
        return this._isSubscriber;
    }

    private isSubscribing:boolean=false;
    subscribe(user:User){
        if(!this.isSubscriber(user) && !this.isSubscribing)
        {
            this.isSubscribing = true;
            var subscription = IssueSubscription.create(this.datastore, this, user);
            subscription.save().subscribe(() => {
                this.subscriptions.push(subscription);
                this._isSubscriber = null;
            },()=>{}, ()=>{
                this.isSubscribing = false;
            });

        }
    }
    private isUnsubscribing:boolean=false;
    unsubscribe(user:User){
        if(this.isSubscriber(user) && !this.isUnsubscribing)
            {
                this.isUnsubscribing = true;
                var subscription = this.subscriptions.filter((other:IssueSubscription) =>{  return other.theSubscriber.id == user.id })[0];
                this.datastore.deleteRecord(IssueSubscription,subscription.id).subscribe(()=>{
                    this._isSubscriber = null;
                    this.subscriptions = this.subscriptions.filter((other:IssueSubscription) =>{  return other.theSubscriber.id != user.id });
                }, ()=>{},()=>{
                    this.isUnsubscribing = false;
                });
            }
    }
}


