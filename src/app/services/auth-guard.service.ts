import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

@Injectable()
export class AuthGuardService implements CanActivate {
  

  constructor(private authService: AuthService,
    private router: Router) { 
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    var user = this.authService.getUser();
    if(!user)
      this.router.navigate([''])
    return user != null;
    
  }

  
}
