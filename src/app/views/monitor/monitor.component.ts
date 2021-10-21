import { Component, OnInit } from "@angular/core";
import { PayVueApiService } from "app/providers/payvue-api.service";
import eventsService from "app/providers/events.service";
import { ToastService } from "ng-uikit-pro-standard";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/observable/interval";
import { Observable } from "rxjs";
@Component({
  selector: "app-monitor",
  templateUrl: "./monitor.component.html",
  styleUrls: ["./monitor.component.scss"],
})
export class MonitorComponent implements OnInit {
  isData: boolean;
  loading: boolean;
  date: string;
  status: any;
  arr: any[] = [];
  newarr: any[] = [];
  details: any;
  unassignedstat: any[] = [];
  page = 1;
  limit = 50;
  isAdmin: boolean;
  isAgent: boolean;
  error: boolean = false;

  vas: any;

  transactionCount: any;
  successfulCount: any;
  failedCount: any;
  initializedCount: any;
  private alive: boolean;
  obs: Observable<any>;

  constructor(
    private payvueservice: PayVueApiService,
    private toast: ToastService,
    private http: HttpClient
  ) {
    this.getVas();
  }

  ngOnInit() {
    Observable.interval(60000).subscribe((val) => {
      console.log("called");
    });
  }

  getUnassigned(status, id) {
    if (status) {
      if (this.arr.includes(id)) {
        return;
      } else {
        this.arr.push({ id });
      }
    } else if (!status) {
      this.arr = this.arr.filter((item) => item.id !== id);
    }
    console.log(this.arr, "arr");
  }

  getVas() {
    this.isData = undefined;
    console.log("calling get vas");

    // let id = this.arr[0].id;

    const apiURL = `v1/transaction/details/summary`;

    this.payvueservice
      .apiCall(apiURL, "post")
      .then((data) => {
        if (data.status == 200) {
          this.vas = data.data;

          console.log("response from server", data);
          if (status) {
            this.transactionCount = this.vas.transactionCount;
            this.successfulCount = this.vas.successfulCount;
            this.failedCount = this.vas.failedCount;
            this.initializedCount = this.vas.initializedCount;
          }
          this.isData = true;
          this.loading = false;
        } else {
          this.isData = false;
          this.loading = false;
        }
      })
      .catch((error) => {
        console.log(error);
        this.isData = false;
        this.loading = false;
      });
  }
}
