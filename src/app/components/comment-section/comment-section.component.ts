import { Utils } from './../../utils/utils';
import { JsonApiQueryData } from 'angular2-jsonapi/dist';
import { IssueComment } from './../../models/issue-comment';
import { CommentService } from './../../services/comment.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Issue } from "../../models/issue";

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit {

  public comments:IssueComment[];
  @Input('hide')
  private hide:boolean=false;
  @Input('issue')
  private issue:Issue;
  constructor(private auth:AuthService, private commentStore:CommentService) { 
    this.comments = [];
  }


  ngOnInit() {
    if(!this.issue)
      throw new Error("Ng init: Comment Section was not given the parent Issue!");
    if(!this.issue.theComments)
      this.fetchComments();
    else{
      this.setComments(this.issue.theComments)
    }
    setInterval(Utils.makeCallback(this, this.updatePostedAgo),30*1000);
  }

  onCommentAdded(){
    if(this.comments)
      this.orderByDate();
  }

  updatePostedAgo(){
    for(var i = 0; i < this.comments.length; i++){
      this.comments[i].updateTimeAgoFields();
    }
  }

  setComments(comments:IssueComment[]){
    this.comments = comments;
    this.orderByDate();
    this.updatePostedAgo();
  }

  orderByDate(){
    this.comments = this.comments.sort((a:IssueComment, b:IssueComment)=>{
      if(a.thePostedDate == b.thePostedDate)
        return 0;
      else if(a.thePostedDate < b.thePostedDate)
        return 1;
      else
        return -1;
    })
  }

  fetchComments(){
    this.commentStore.getAllCommentsForIssue(this.issue).subscribe((comments:JsonApiQueryData<IssueComment>) =>{
      this.comments = comments.getModels();
    })
    
  }


}
