import { Utils } from './../../utils/utils';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { IUser } from "../../models/iuser";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  public user:IUser;
  private auth:AuthService;

  constructor(auth:AuthService) { 
    this.auth = auth;
    auth.subscribe_Authenticated(Utils.makeCallback(this, this.setUser));
    this.setUser(this.auth.getUser())
  }

  ngOnInit() {
  }

  loggedIn(){
    return this.user != null && this.user.getRoleAsInt() > 0;
  }
  
  private setUser(user:IUser){
    console.log('navbar knows:',user)
    this.user = user;
  }
}
