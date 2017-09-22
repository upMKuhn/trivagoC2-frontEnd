import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginForm } from "./login-form";
import { FormsModule , FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { UserCredentials } from "./UserCredentials";
import { Utils } from "../../utils/utils";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private authService:AuthService;
  private router:Router;

  userModel:UserCredentials;
  public loginForm:LoginForm;  


  constructor(authService:AuthService, router:Router) {
    this.authService = authService;
    this.router = router;
   }

  ngOnInit() {
    this.loginForm = new LoginForm();
    return this;
  }

  onLogin(form) {
    if(this.loginForm.valid && this.loginForm.dirty){
      var credentials = this.loginForm.toUserCredentials();
      var promise = this.authService.login(credentials, 
        Utils.makeCallback(this, this.onLoginSuccess),
        Utils.makeCallback(this, this.onLoginFailed)
      );
    }
  }

  onLoginFailed(){
    console.log("login failed");
  } 

  onLoginSuccess(){
    console.log("login success");
    this.router.navigate(['buildings']);
  }

}
