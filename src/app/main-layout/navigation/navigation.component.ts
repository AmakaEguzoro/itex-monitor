import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { AuthService } from "../../../app/providers/auth.service";
import { Router } from "@angular/router";
import { ToastService } from "ng-uikit-pro-standard";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent implements OnInit {
  @ViewChild("sidenav") sidenav: ElementRef;

  clicked: boolean;
  userDisplayName: any;
  constructor(private authService: AuthService, private router: Router) {
    this.clicked = this.clicked === undefined ? false : true;
  }

  ngOnInit() {
    this.userDisplayName = localStorage.getItem("loggedUser");
  }

  setClicked(val: boolean): void {
    this.clicked = val;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
