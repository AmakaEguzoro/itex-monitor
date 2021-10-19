import { Router } from "@angular/router";

import { Component, OnInit } from "@angular/core";
import { PayVueApiService } from "../../../providers/payvue-api.service";
import { AuthService } from "../../../providers/auth.service";
import { ToastService } from "ng-uikit-pro-standard";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  orangeFormName: string = "";
  amaka = "nicole";
  loading = false;
  error: boolean;
  errors: any;

  constructor(
    private router: Router,
    private payvueservice: PayVueApiService,
    private authService: AuthService,
    private toast: ToastService
  ) {}

  userDetails = new FormGroup({
    // email: new FormControl("", [
    //   Validators.required,
    //   this.validateInput,
    //   // Validators.email,
    //   // Validators.pattern(this.emailFormat)
    // ]),
  });

  ngOnInit() {}

  // Signs User into system
  signIn() {
    this.loading = true;

    const apiURL = `user/login`;

    // this.errorHandler();  "uniqueParameter": "username",

    this.payvueservice
      .apiCall(apiURL, "post", {
        login: this.username,
        password: this.password,
      })
      .then((data) => {
        console.log("here");
        this.loading = false;
        if (data.status == 200) {
          this.toast.success(data.message || "User Login Successful");
          this.authService.logIn(data.data.token, data.data);
        } else {
          this.router.navigate(["/login"]);
          this.loading = false;
        }
      })
      .catch((error) => {
        console.log("failed to login", error);
        let errorBody = error;
        this.toast.error(error.message);
        this.loading = false;
      });
  }
}
