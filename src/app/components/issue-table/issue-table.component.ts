import { AuthService } from './../../services/auth.service';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
  } from '@angular/core';
import { DataStoreService } from './../../services/data-store.service';
import { IIssueStateService } from './IIssueStateService';
import { Issue } from './../../models/issue';
import { IssueComment } from './../../models/issue-comment';
import { IssueState } from './../../models/IssueState';
import { JsonApiQueryData } from 'angular2-jsonapi/dist';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { Utils } from './../../utils/utils';

@Component({
  selector: 'app-issue-table',
  templateUrl: './issue-table.component.html',
  styleUrls: ['./issue-table.component.scss']
})
export class IssueTableComponent implements OnInit {


  @Input("getIssues")
  private getIssues:() => Observable<JsonApiQueryData<Issue>>;
  @Input("issues")
  private issues:Issue[] = [];
  private issueMeta:any;
  private issuePageNumbers=[];

  @Input("IIssueStateService")
  private issueStateManager:IIssueStateService;
  private updateIssueAgoFieldsHandle = null;

  @Input("tableTitle")
  private tableTitle:string;
  @Input("tableTitleIcon")
  private tableTitleIcon:string;

  private user:User;

  @Input("hideActions")
  private hideActions:{ blockIssue:boolean, progressIssue:boolean, resolveIssue:boolean };

  @Output('onIssueChanged')
  private onIssueChanged:EventEmitter<{issue:Issue}> = new EventEmitter();

  private openIssueCommentSection:Issue;
  constructor(private dataStore:DataStoreService, private router:Router, private auth:AuthService, private userService:UserService) { 
    this.tableTitle = "";
    this.tableTitleIcon = "";
    this.issues = Utils.getOrDefault(this.issues,[]);
    this.hideActions={blockIssue:false, progressIssue:false, resolveIssue:false};
    this.openIssueCommentSection = null;
    this.user = this.auth.getUser();
  }

  ngOnInit() {
    this.sortIssuesArrayByUrgency();
    this.updateIssue_TimeAgoFields();
  }

  addIssue(issue:Issue){
    this.removeIssue(issue);
    this.issues.push(issue);
    this.sortIssuesArrayByUrgency();
  }

  onCommentPosted(comment:IssueComment){
    console.log('commented',comment)
  }

  updateIssue_TimeAgoFields(){
    if(this.updateIssueAgoFieldsHandle == null)
      setInterval(Utils.makeCallback(this, this.updateIssue_TimeAgoFields), 5000);
    for(var i = 0; i < this.issues.length; i++)
      this.issues[i].updateTimeAgoFields();
    this.sortIssuesArrayByUrgency();
  }

  blockIssue(issue:Issue){
    if(!issue.theState.isBlocked()){
      this.removeIssue(issue);
      this.issueStateManager.requestBlockIssue(issue).subscribe(()=>{
        //this.updateIssues();
      })
      this.onIssueChanged.emit({issue:issue})
    }
  }

  progressIssue(issue:Issue){
    if(!issue.theState.isProgressing()){
      this.removeIssue(issue);
      this.issueStateManager.requestProgressIssue(issue).subscribe(()=>{
        //this.updateIssues();
      })
      this.onIssueChanged.emit({issue:issue})
    }
  }

  resolveIssue(issue:Issue){
    if(!issue.theState.isResolved()){
      this.removeIssue(issue);
      this.issueStateManager.requestResolveIssue(issue).subscribe(()=>{
        //this.updateIssues();
      })
      this.onIssueChanged.emit({issue:issue})
    }
  }

  deleteIssue(issue:Issue){
    if(true && issue.id){
      this.removeIssue(issue);
      this.dataStore.deleteRecord(Issue, issue.id).subscribe(()=>{
        //this.updateIssues();
      });
    }
  }

  /**Fetch from DB */
  updateIssues(){
    if(this.getIssues != undefined)
      this.getIssues().subscribe((data)=>{
        this.issues = data.getModels();
        this.issueMeta = data.getMeta();
        this.sortIssuesArrayByUrgency();
      });
  }

  showCommentSection(issue){
    if(!this.openIssueCommentSection || issue.id != this.openIssueCommentSection.id)
      this.openIssueCommentSection = issue;
    else{
      this.openIssueCommentSection = null;
    }
  }
  

  private removeIssue(issue:Issue){
    if(issue.id){
      this.issues = this.issues.filter((listedIssue:Issue) => {
        return listedIssue.id != issue.id
      })
    }
  }

  public sortIssuesArrayByUrgency(){
    this.issues = this.issues.sort((a:Issue, b:Issue) => {
        var a_priority = a.thePriority;
        var b_priority = b.thePriority;
        if(a_priority.getActionValue() == b_priority.getActionValue()){
            return 0;
        } else if(a_priority.getActionValue() > b_priority.getActionValue()){
            return -1;
        }else if(a_priority.getActionValue() < b_priority.getActionValue()){
            return 1;
        }
    });
  }


}
