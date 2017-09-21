import { UserService } from './../../services/user.service';
import { Utils } from './../../utils/utils';
import { AuthGuardService } from './../../services/auth-guard.service';
import { DataStoreService } from './../../services/data-store.service';
import { RegisterForm } from './register-form';
import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private registerForm:RegisterForm;
  constructor(private store:DataStoreService, private auth:AuthGuardService, private userService:UserService) { 
    this.registerForm = new RegisterForm();
  }

  ngOnInit() {
  }


  register() {
    if(this.registerForm.valid && this.registerForm.dirty){
      var cred = this.registerForm.toUserCredentials();
      var user = User.create(this.store, cred.username, cred.password)
      user.save().subscribe(Utils.makeCallback(this, this.onRegisterSuccess, this.onRegisterFailed))
      //this.userService.
    }
  }

  onRegisterFailed(){
    console.log("login failed");
  } 

  onRegisterSuccess(){
    console.log("login success");
    //this.router.navigate(['buildings']);
  }

}
