import { DataStoreService } from './../../services/data-store.service';
import { Utils } from './../../utils/utils';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import {  User } from "../../models/user";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  
  private userService;
  private users:User[]; 
  public setUsers(users:User[]){ this.users = users;}  
  constructor(userService:UserService) { 
    userService.fetchAll(Utils.makeCallback(this, this.setUsers));
  }

  ngOnInit(): void {

  }


}
