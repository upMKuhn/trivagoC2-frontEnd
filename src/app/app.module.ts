import { CommentService } from './services/comment.service';
import { AuthGuardService } from './services/auth-guard.service';
import { IssuePriorityService } from './services/issue-priority.service';
import { IssueCategoryService } from './services/issue-category.service';
import { IssueStateService } from './services/issue-state.service';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { BuildingCardComponent } from './components/building-card/building-card.component';
import { BuildingService } from './services/building.service';
import { BuildingsPageComponent } from './pages/buildings-page/buildings-page.component';
import { DataStoreService } from './services/data-store.service';
import { FloorCardComponent } from './components/floor-card/floor-card.component';
import { FloorPageComponent } from './pages/floor-page/floor-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpBasicAuthClient } from './services/http-basic-auth-client.service';
import { HttpModule } from '@angular/http';
import { IssueService } from './services/issue.service';
import { JsonApiModule } from 'angular2-jsonapi';
import { KeysPipe } from './utils/keys-pipe';
import { LoginComponent } from './components/login/login.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MdInputModule, MdIconModule, MdTooltipModule, MdSelectModule, MdChipsModule, MdMenuModule } from '@angular/material';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCardComponent } from './components/users/user-card/user-card.component';
import { UserService } from './services/user.service';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { IssueTableComponent } from './components/issue-table/issue-table.component';
import { IssueFormComponent } from './components/issue-form/issue-form.component';
import { CommentSectionComponent } from './components/comment-section/comment-section.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { RegisterComponent } from './components/register/register.component';





const appRoutes: Routes = [
  {  path: '', component:LoginPageComponent },
  {  path: 'buildings', component:BuildingsPageComponent , canActivate: [ AuthGuardService ]},
  {  path: 'floor/:id', component:FloorPageComponent , canActivate: [ AuthGuardService ] },
  {  path: 'management/users', component:UsersPageComponent , canActivate: [ AuthGuardService ]},
];

@NgModule({
  declarations: [
    KeysPipe,

    AppComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    UserCardComponent,
    BuildingCardComponent,
    FloorCardComponent,
    LoginPageComponent,
    UsersPageComponent,
    BuildingsPageComponent,
    FloorPageComponent,
    IssueTableComponent,
    IssueFormComponent,
    CommentSectionComponent,
    CommentFormComponent,
    RegisterComponent,
  ],
  imports: [
    HttpModule,
    MdIconModule,
    MdSelectModule,
    JsonApiModule,
    MdInputModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MdChipsModule,
    BrowserAnimationsModule,
    MdTooltipModule,
    MdMenuModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ 
      AuthGuardService,
      HttpBasicAuthClient,
      IssueService, 
      IssueStateService, 
      AuthService, 
      UserService, 
      DataStoreService, 
      BuildingService,
      CommentService,
      IssueCategoryService,
      IssuePriorityService
    ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  
 }
