import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { AuthService } from "../../providers/auth.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
})
export class NavigationComponent implements OnInit {
  @ViewChild("sidenav") sidenav: any;
  screen_width: any;
  merchant: boolean;
  user: boolean;
  admin: boolean;
  super: boolean;
  staff: boolean;
  url: any;
  u: any;
  page = 1;
  limit = 50;
  serial = 0;
  isAdmin: boolean;
  isAgent: boolean;
  walletId: any;
  start: string;
  end: string;
  date: string;
  summaryData: any;
  role: any;
  clicked: boolean;
  walletBalance: any;
  merchantCode: any;
  apiURL: string;
  constructor(private authService: AuthService, private route: ActivatedRoute) {
    this.clicked = this.clicked === undefined ? false : true;
    this.url = this.route.url;

    this.merchant = false;
    this.user = false;
    this.admin = false;
    this.super = false;

    const userStr = localStorage.getItem("user");

    this.u = JSON.parse(userStr);

    // if (u && u.roles.includes("merchant")) {
    //   this.merchant = true;
    // }
    // if (u && u.roles.includes("")) {
    //   this.user = true;
    // }
    // if (u && u.roles.includes("admin")) {
    //   this.admin = true;
    // }
    // if (u && u.roles.includes("super")) {
    //   this.super = true;
    // }
  }

  ngOnInit() {
    this.screen_width = screen.width;
    console.log(this.screen_width);
  }

  setClicked(val: boolean): void {
    this.clicked = val;
  }

  signOut() {
    this.authService.logout();
  }

  goToElement(elemId) {
    const element = document.querySelector("#" + elemId);
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  closeNav() {
    if (this.screen_width >= 1400) return;
    this.sidenav.hide();
  }
}
