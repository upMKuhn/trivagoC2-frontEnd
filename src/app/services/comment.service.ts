import { DataStoreService } from './data-store.service';
import { IssueComment } from './../models/issue-comment';
import { Observable } from 'rxjs/Observable';
import { Issue } from './../models/issue';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CommentService {


  constructor(private dataStore:DataStoreService) {

  }

  getAllCommentsForIssue(issue:Issue) {
    return this.dataStore.findAll(IssueComment, {
      include:'author,issue',
      eq: { 'issue.id' : issue.id }
    });
  }

}
