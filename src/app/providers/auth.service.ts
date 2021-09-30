import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  origin_url: string;

  constructor(private router: Router) {}

  // Logs user out of system
  logout() {
    // if (window.location.pathname != '/')
    //     localStorage.setItem('redirect', window.location.pathname);
    localStorage.removeItem("itt");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("branch");
    localStorage.removeItem("zone");
    localStorage.removeItem("region");
    localStorage.removeItem("ptsp");
    this.router.navigate(["/login"]);
  }

  // Routes user to dashboard or saved page
  // @param token, user
  logIn(token, user) {
    localStorage.setItem("token", token);
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("user", JSON.stringify(user));
    // const userStr = localStorage.getItem('user');
    // const u = JSON.parse(userStr);

    let intendedURL = localStorage.getItem("intendedURL");
    if (intendedURL && intendedURL !== "/login") {
      localStorage.removeItem("intendedURL");

      this.router.navigateByUrl(intendedURL);
      console.log("intended", intendedURL);
      return;
    }

    this.router.navigate(["/merchant"]);
  }

  loggedIn() {
    return !!localStorage.getItem("token");
  }

  // // Checks if user is still allowed to be logged in to the system
  // // @param err
  checkSession(err) {
    console.log(err);
    if (err.status == 401 || err.status == 403) {
      localStorage.setItem("intendedURL", location.pathname);
      this.logout();
      return true;
    }
    return false;
  }

  roleCheck(role: string) {
    if (this.loggedIn()) {
      if (localStorage.getItem("face") == null) this.logout();

      if (localStorage.getItem("face") == role) {
        return true;
      }
      return false;
    }
    return false;
  }
}
