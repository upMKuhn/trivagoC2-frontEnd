import { AuthService } from './../../services/auth.service';
import { Utils } from './../../utils/utils';
import { IssueStateService } from './../../services/issue-state.service';
import { IssuePriorityService } from './../../services/issue-priority.service';
import { BuildingFloor } from './../../models/building-floor';
import { Issue } from './../../models/issue';
import { IssueService } from './../../services/issue.service';
import { IssueFormGroup } from './IssueFormGroup';
import { FormGroup } from '@angular/forms';
import { IssueCategoryService } from './../../services/issue-category.service';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { User } from "../../models/user";

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IssueFormComponent implements OnInit {
  
  public issueForm:IssueFormGroup;
  
  @Input("floor")
  private floor:BuildingFloor;
  @Input("onIssueAdded")
  private onIssueAdded:(issue:Issue)=>void;

  constructor(
    private issueStore:IssueService, 
    private authService:AuthService, 
    public categoryStore: IssueCategoryService, 
    public priorityStore:IssuePriorityService,
    public stateStore:IssueStateService) {
    this.issueForm = new IssueFormGroup();
    this.onIssueAdded = Utils.getOrDefault(this.onIssueAdded, function(){});
  }

  ngOnInit() {
    if(!this.floor)
      console.error("Issue Form expects floor as parameter!");
  }

  raiseIssue(){
    if(this.issueForm.valid && this.issueForm.dirty){

      var issue = Issue.create(this.issueStore.getStore(), 
        this.issueForm.get('title').value,
        this.issueForm.get('location').value,
        this.floor, 
        this.categoryStore.byName(this.issueForm.get('category').value),
        this.priorityStore.byName(this.issueForm.get('priority').value),
        this.stateStore.getCreatedCategory(),
        <User>this.authService.getUser()
      );
      this.onIssueAdded(issue);
      issue.save().subscribe(()=>{
        this.issueForm.reset();
      });
    }
  }

  raiseIssueOnEnter(event){
    if(event.keyCode == 13)
      this.raiseIssue();
  }
}
