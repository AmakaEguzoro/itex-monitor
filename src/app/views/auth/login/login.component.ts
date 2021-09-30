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
  // emailFormat = '^[\\w._-]+@[\\w]+[-.]?[\\w]+\.[\\w]+$'
  // idFormat = '^\\w{15}$'
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

  // validateInput(c: FormControl) {
  //   let emailFormat = /^[\w._-]+@[\w]+[-.]?[\w]+\.[\w]+$/;
  //   let idFormat = /^\w{15}$/;

  //   return emailFormat.test(c.value) || idFormat.test(c.value)
  //     ? null
  //     : {
  //         validateInput: {
  //           valid: false,
  //         },
  //       };
  // }

  ngOnInit() {}
  // localStorage.removeItem("itt");
  // this.loginVm = new LoginVm();
  // console.log("Login Init");localStorage.Special='true';

  //   this.errors = {
  //     email_detail: "",
  //     password_length: "",
  //     password: "",
  //     email: "",
  //   };
  // }

  // Checks User's Input for errors
  // errorHandler() {
  //   this.error = false;
  //   this.errors = {
  //     email_detail: "",
  //     password_length: "",
  //     password: "",
  //     email: "",
  //   };

  //   this.email = this.userDetails.get("email").value;

  //   this.errors = {
  //     email_detail:
  //       !this.userDetails.get("email").valid && this.email
  //         ? "This is not a Valid Email or Merchant ID"
  //         : "",
  //     password_length:
  //       this.password && this.password.length < 8
  //         ? "Minimum password length is 8 "
  //         : "",
  //     password: !this.password ? "Password is Required" : "",
  //     email: !this.email ? "Email or Merchant ID is required" : "",
  //   };

  //   if (!this.userDetails.get("email").valid && this.email) this.error = true;
  //   if (!this.password) this.error = true;
  //   if (!this.email) this.error = true;
  //   if (this.password && this.password.length < 8) this.error = true;
  // }

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
       
        console.log("here")
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
