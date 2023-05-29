import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PageGuard implements CanActivate {
  constructor(
    private router: Router,
    private _authService: AuthService
    ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean > | Promise<boolean> | boolean  {
      const user = this._authService.getAuth();
      if (!user) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
  }

}
