import { Injectable, EventEmitter } from "@angular/core";
import {
  HttpHeaders,
  HttpClient,
  HttpEventType,
  HttpResponse,
} from "@angular/common/http";
import "rxjs";
import { AuthService } from "./auth.service";
import { environment } from "environments/environment";
import "rxjs/add/operator/catch";
import { throwError } from "rxjs";
import { map } from "rxjs/operators";

import { cR } from "@angular/core/src/render3";
@Injectable()
export class PayVueApiService {
  private rootURL = environment.baseUrl + "/api/";
  // private rootURL2 = environment.baseUrl2 + "/api/v1/";

  uploadPercent = new EventEmitter();
  isDone = new EventEmitter();
  constructor(
    private http: HttpClient,
    private authservice: AuthService // private socket: Socket, // private toast: ToastService
  ) {}
  options: any;
  ngOnInit(): void {}
  getUser(): any {
    const userStr = localStorage.getItem("user");
    try {
      const user = JSON.parse(userStr);
      return user;
    } catch (error) {
      return null;
    }
  }
  apiCall(
    url,
    method = "get",
    data = {},

    isFormData = false,
    showProgress = false
  ): Promise<any> {
    let apiURL = `${this.rootURL}${url}`;

    let headers = new HttpHeaders();
    // let item = localStorage.getItem("itt");

    if (!isFormData) headers = headers.set("Content-Type", "application/json");
    headers = headers.set("X-Auth-Token", localStorage.getItem("token"));
    this.options = { headers, reportProgress: false };

    if (showProgress) {
      this.options = { headers, reportProgress: false, observe: "" };

      (this.options.reportProgress = true), (this.options.observe = "events");
    }

    let request: any;

    request = this.http[method](
      apiURL,
      "get delete".includes(method) ? this.options : data,
      this.options
    );

    return new Promise((resolve, reject) => {
      request.subscribe(
        (event) => {
          if (showProgress && event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round((100 * event.loaded) / event.total);
            this.uploadPercent.emit(percentDone);
          } else if (event instanceof HttpResponse) {
            const done = "File is completely uploaded!";
            this.isDone.emit(done);
          }
          if (event.type === HttpEventType.Response || !event.body) {
            resolve(event.body || event);
          }
        },
        (error) => {
          this.authservice.checkSession(error);
          console.log(error, "errors are happening");
          reject(error);
        }
      );
    });
  }

  // apiCall2(
  //   url,
  //   method = "get",
  //   data = {},
  //   isFormData = false,
  //   showProgress = false
  // ): Promise<any> {
  //   let apiURL = `${this.rootURL2}${url}`;
  //   // if(isFormData) apiURL = `http://192.168.9.123:3000/${url}`
  //   // if(isFormData) apiURL = `http://23.239.0.110:8082/${url}`
  //   let headers = new HttpHeaders();
  //   headers = headers.set("Content-Type", "application/json");
  //   // headers = headers.set(
  //   //   "Authorization",
  //   //   "bearer " + localStorage.getItem("itt")
  //   // );
  //   this.options = { headers, reportProgress: false };
  //   // if (showProgress) {
  //   // let options = { headers, reportProgress: false, observe: <any>"" };

  //   //   options.reportProgress = true,
  //   //     options.observe = 'events'
  //   // }
  //   if (showProgress) {
  //     this.options = { headers, reportProgress: false, observe: "" };

  //     (this.options.reportProgress = true), (this.options.observe = "events");
  //   }

  //   let request: any;

  //   request = this.http[method](
  //     apiURL,
  //     "get delete".includes(method) ? this.options : data,
  //     this.options
  //   );

  //   return new Promise((resolve, reject) => {
  //     request.subscribe(
  //       (event) => {
  //         if (showProgress && event.type === HttpEventType.UploadProgress) {
  //           const percentDone = Math.round((100 * event.loaded) / event.total);
  //           this.uploadPercent.emit(percentDone);
  //         } else if (event instanceof HttpResponse) {
  //           const done = "File is completely uploaded!";
  //           this.isDone.emit(done);
  //         }
  //         if (event.type === HttpEventType.Response || !event.body) {
  //           resolve(event.body || event);
  //         }
  //       },
  //       (error) => {
  //         this.authservice.checkSession(error);
  //         console.log(error, "errors are happening");
  //         reject(error);
  //       }
  //     );
  //   });
  // }
}
