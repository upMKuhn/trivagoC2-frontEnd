import { DataStoreService } from './../../services/data-store.service';
import { IssueComment } from './../../models/issue-comment';
import { AuthService } from './../../services/auth.service';
import { User } from './../../models/user';
import { Issue } from './../../models/issue';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

  @Input('issue')
  private issue:Issue;

  private theMessage:string;
  private messageMaxLen = 255;
  private messageMinLen = 4;

  @Output() 
  commentPosted = new EventEmitter();
  
  constructor(private auth:AuthService, private dataStore:DataStoreService) { 
  }

  ngOnInit() {
    if(!this.issue)
      console.error("CommentFormComponent needs an issue model!");
  }

  post(){
    if(this.theMessage.length >= this.messageMinLen){
      var user = this.auth.getUser();
      var comment = IssueComment.create(this.dataStore, this.theMessage, user, this.issue);
      comment.save().subscribe(()=>{
        this.issue.theComments.push(comment);
        this.commentPosted.emit(comment);
      });

      this.theMessage = "";
    }
  }

  postOnEnter(event){
    if(event.keyCode == 13)
      this.post();
  }


}
