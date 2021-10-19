import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { SocketService } from "./providers/socket.service";
import { ToastService } from "ng-uikit-pro-standard";
import eventsService from "app/providers/events.service";
import { PayVueApiService } from "./providers/payvue-api.service";

@Component({
  selector: "mdb-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.css"],
})
export class AppComponent implements OnInit {
  values: string[] = ["Tag 1", "Tag 2", "Tag 4"];

  specialPage: boolean = false;

  private specialPages: any[] = ["/login", "/auth/verify", "/auth/reset"];

  toastAlert: any;

  constructor(
    private router: Router,
    private location: Location,
    private socket: SocketService,
    private toast: ToastService,
    private payvueservice: PayVueApiService
  ) {
    if (localStorage.getItem("loggedIn")) {
      // this.getCategory();
    }
  }

  isSpecialPage(): boolean {
    const currentUrl = `${this.router.url || "/"}`.split("?")[0];
    return this.specialPages.includes(currentUrl);
  }

  ngOnInit(): void {
    localStorage.removeItem("year");
    localStorage.removeItem("month");
    localStorage.removeItem("day");
    localStorage.removeItem("xfile");
  }

  goBack(): void {
    this.location.back();
  }
}
