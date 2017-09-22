import { Utils } from './../../../utils/utils';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { IUser } from "../../../models/iuser";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input('userList')
  public user:IUser;
  editMode:boolean = false;
  userCanEdit:boolean = true;

  ngOnInit() {
    
  }

  edit(){
    this.editMode = !this.editMode;
  }

  submit(){
    this.editMode = !this.editMode;
  }
} 
