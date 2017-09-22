import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
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

  public registerForm:RegisterForm;
  constructor(private store:DataStoreService, 
    private auth:AuthService, 
    private userService:UserService,
    private router:Router
  ){ 
    this.registerForm = new RegisterForm();
  }

  ngOnInit() {
  }


  register() {
    if(this.registerForm.valid && this.registerForm.dirty){
      var cred = this.registerForm.toUserCredentials();
      var user = User.create(this.store, cred.username, cred.email)
      this.userService.register(user, cred.password, () =>{
        this.auth.login(cred, 
          Utils.makeCallback(this, this.onRegisterSuccess),
          Utils.makeCallback(this, this.onRegisterFailed)
        );
      });
    }
  }

  onRegisterFailed(){
    console.log("register failed");
  } 

  onRegisterSuccess(){
    console.log("login success");
    this.router.navigate(['buildings']);
  }

}
