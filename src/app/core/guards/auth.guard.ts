import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
 

  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    return this.check();
  }

  canActivateChild(): boolean | UrlTree {
    return this.check();
  }

  private check(): boolean | UrlTree {
    const token = localStorage.getItem('token');

    if (!token) {
      return this.router.parseUrl('/login');
    }

    // Optional: validate role
    const role = localStorage.getItem('role');

    if (!role) {
      localStorage.clear();
      return this.router.parseUrl('/login');
    }

    return true;
  }
}
