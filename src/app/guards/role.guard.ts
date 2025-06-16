import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const expectedRoles = route.data['roles'] as string[];
    const userRole = this.auth.getRole();

    if (expectedRoles.includes(userRole)) {
      return true;
    }

    // Redirect to dashboard or login depending on auth state
    return this.auth.isLoggedIn()
      ? this.router.createUrlTree(['/dashboard'])
      : this.router.createUrlTree(['/']);
  }
}
