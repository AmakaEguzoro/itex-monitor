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
  private rootURL = environment.baseUrl + "/api/v1/";
  private rootURL2 = environment.baseUrl2 + "/api/v1/";

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
    method = "get post",
    data = {},

    isFormData = false,
    showProgress = false
  ): Promise<any> {
    let apiURL = `${this.rootURL}${url}`;
    let headers = new HttpHeaders();
    let item = localStorage.getItem("token");
    if (item) {
      if (!isFormData)
        headers = headers.set("Content-Type", "application/json");
      headers = headers.set("token", localStorage.getItem("token"));
    }

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

  apiCall2(
    url,
    method = "get",
    data = {},

    isFormData = false,
    showProgress = false
  ): Promise<any> {
    let apiURL2 = `${this.rootURL2}${url}`;
    // if (isFormData) apiURL2 = `https://ims.itexapp.com/${url}`;
    let headers = new HttpHeaders();
    let item = localStorage.getItem("token");
    if (item) {
      if (!isFormData)
        headers = headers.set("Content-Type", "application/json");
      headers = headers.set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTg1YmQxYzRmMTlmNzRkMTBjMmQ4MTUiLCJuYW1lIjoiZGV2IiwiZW1haWwiOiJkZXZlbG9wZXJzQGlpc3lzZ3JvdXAuY29tIiwidXNlcm5hbWUiOiJkZXZlbG9wZXJzIiwicm9sZXMiOlt7ImlkIjoxLCJuYW1lIjoiYWRtaW4ifV0sImlhdCI6MTYzMzQ3NzY5OSwiZXhwIjoyMTAwMDM3Njk5fQ.ExBGLZW512y1Z3KPRXchaaRjeSc-0HBE1nvA7fJ0wCk"
      );
    }

    this.options = { headers, reportProgress: false };

    if (showProgress) {
      this.options = { headers, reportProgress: false, observe: "" };

      (this.options.reportProgress = true), (this.options.observe = "events");
    }

    let request: any;

    request = this.http[method](
      apiURL2,
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
}
