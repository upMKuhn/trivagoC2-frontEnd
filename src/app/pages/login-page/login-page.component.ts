import { LoginComponent } from './../../components/login/login.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  private login:LoginComponent
  constructor() { }
  ngOnInit() {

  }

}
