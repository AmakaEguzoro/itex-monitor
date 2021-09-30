import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../../providers/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // Checks if user is allowed to access certain modules
  canActivate() {
    if (!this.authService.loggedIn()) {
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }
}
