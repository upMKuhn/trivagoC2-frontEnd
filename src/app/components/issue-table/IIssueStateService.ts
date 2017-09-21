import { Issue } from './../../models/issue';
import { Observable } from 'rxjs/Observable';


export interface IIssueStateService {
    requestBlockIssue(issue:Issue): Observable<any>;    
    requestProgressIssue(issue:Issue): Observable<any>;    
    requestResolveIssue(issue:Issue): Observable<any>;    
}