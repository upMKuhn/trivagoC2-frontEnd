import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { IssueTableComponent } from './../../components/issue-table/issue-table.component';
import { IIssueStateService } from './../../components/issue-table/IIssueStateService';
import { Observable } from 'rxjs/Observable';
import { JsonApiQueryData } from 'angular2-jsonapi/dist';
import { IssueService } from './../../services/issue.service';
import { Issue } from './../../models/issue';
import { Utils } from './../../utils/utils';
import { BuildingFloor } from './../../models/building-floor';
import { Building } from './../../models/building';
import { DataStoreService } from './../../services/data-store.service';
import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { User } from "../../models/user";

@Component({
  selector: 'app-floor-page',
  templateUrl: './floor-page.component.html',
  styleUrls: ['./floor-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FloorPageComponent implements OnInit, IIssueStateService {


  private _floor:BuildingFloor;

  @ViewChild("openIssuesTable")
  private openIssuesTable:IssueTableComponent;
  @ViewChild("blockedIssuesTable")
  private blockedIssuesTable:IssueTableComponent;
  @ViewChild("resolvedIssuesTable")
  private resolvedIssuesTable:IssueTableComponent;
  @ViewChild("progressingIssuesTable")
  private progressingIssuesTable:IssueTableComponent;

  public openIssues:Issue[];
  public blockedIssues:Issue[];
  public progressingIssues:Issue[];
  public resolvedIssues:Issue[];
  public loggedInUser:User;
  
  public  getOpenIssues:() => Observable<JsonApiQueryData<Issue>>;
  public  getBlockedIssues:() => Observable<JsonApiQueryData<Issue>>;
  public  getProgressingIssues:() => Observable<JsonApiQueryData<Issue>>;
  public  getResolvedIssues:() => Observable<JsonApiQueryData<Issue>>;
  public issueAdded:(issue:Issue) => void;

  constructor(
    private route: ActivatedRoute,
    private dataStore: DataStoreService,
    private issueRepo: IssueService,
    private auth: AuthService,
    private userService: UserService,
  ) { 
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      var floorId = paramMap.get('id');
      this._floor = new BuildingFloor(null,null);
      
      this.dataStore.findRecord(BuildingFloor, floorId).subscribe((floor:BuildingFloor)=>{
        this._floor = floor;
        this.updateTables();
      });
      
      this.loggedInUser = this.auth.getUser(); 
      this.userService.fetchOrPeekWithSubscriptions(this.auth.getUser().id).subscribe((user)=>{
        this.loggedInUser = user;
      });

      this.openIssues = [];
      this.blockedIssues = [];
      this.progressingIssues = [];
      this.resolvedIssues = [];

      this.getOpenIssues = Utils.makeCallback(issueRepo, issueRepo.getOpenIssuesForFloor, floorId);
      this.getBlockedIssues = Utils.makeCallback(issueRepo, issueRepo.getBlockedIssuesForFloor, floorId);
      this.getProgressingIssues = Utils.makeCallback(issueRepo, issueRepo.getProgressingIssuesForFloor, floorId);
      this.getResolvedIssues = Utils.makeCallback(issueRepo, issueRepo.getClosedIssuesForFloor, floorId);

      this.issueAdded = Utils.makeCallback(this,this.onIssueAdded);
    });
  }

  ngOnInit() {
  }
  
  public get floor():BuildingFloor{ return this._floor;}
  
  requestBlockIssue(issue: Issue): Observable<any> {
    var observable = this.issueRepo.blockIssue(issue);
    observable.subscribe(()=>{
      this.blockedIssuesTable.updateIssues();
    });
    return observable;
  }

  requestProgressIssue(issue: Issue): Observable<any> {
    var observable = this.issueRepo.progressIssue(issue);
    observable.subscribe(()=>{
      this.progressingIssuesTable.updateIssues();
    });
    return observable;  
  }

  issueStateChanged(event:{issue:Issue}){
    if(event.issue.theState.isBlocked()){
      this.blockedIssuesTable.addIssue(event.issue);
    }else if(event.issue.theState.isProgressing()){
      this.progressingIssuesTable.addIssue(event.issue);
    }else if(event.issue.theState.isResolved()){
      this.resolvedIssuesTable.addIssue(event.issue);
    }
  }

  requestResolveIssue(issue: Issue): Observable<any> {
    var observable = this.issueRepo.resolveIssue(issue);
    observable.subscribe(()=>{
      this.resolvedIssuesTable.updateIssues();
    });
    return observable;  
  }

  onIssueAdded(issue:Issue){
    this.openIssuesTable.addIssue(issue);
  }

  updateTables(){
    this.issueRepo.getOpenIssuesForFloor(this.floor.id).subscribe((data:JsonApiQueryData<Issue>) =>{
      this.openIssues = data.getModels();
      this.openIssuesTable.sortIssuesArrayByUrgency();
    });
    this.issueRepo.getProgressingIssuesForFloor(this.floor.id).subscribe((data:JsonApiQueryData<Issue>) =>{
      this.progressingIssues = data.getModels();
      this.progressingIssuesTable.sortIssuesArrayByUrgency();
    });
    this.issueRepo.getBlockedIssuesForFloor(this.floor.id).subscribe((data:JsonApiQueryData<Issue>) =>{
      this.blockedIssues = data.getModels();
      this.blockedIssuesTable.sortIssuesArrayByUrgency();
    });
    this.issueRepo.getClosedIssuesForFloor(this.floor.id).subscribe((data:JsonApiQueryData<Issue>) =>{
      this.resolvedIssues = data.getModels();
      this.resolvedIssuesTable.sortIssuesArrayByUrgency();
    });
  }

  onIssueChanged(event:{issue:Issue}){
    if(event.issue.theState.isProgressing()){
      this.progressingIssuesTable.addIssue(event.issue);
    }
    if(event.issue.theState.isBlocked()){
      this.blockedIssuesTable.addIssue(event.issue);
    }
    if(event.issue.theState.isResolved()){
      this.resolvedIssuesTable.addIssue(event.issue);
    }
  }
}
