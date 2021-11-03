import { Component, OnInit } from "@angular/core";
import { PayVueApiService } from "app/providers/payvue-api.service";
import eventsService from "app/providers/events.service";
import { ToastService } from "ng-uikit-pro-standard";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/observable/interval";
import { Observable } from "rxjs";
@Component({
  selector: "app-interswitch",
  templateUrl: "./interswitch.component.html",
  styleUrls: ["./interswitch.component.scss"],
})
export class InterswitchComponent implements OnInit {
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
  private alive: boolean;
  obs: Observable<any>;

  interswitch: any;

  totalTransactions: any;
  approvedTransactions: any;
  failedTransactions: any;
  pendingTransactions: any;
  approvedPercent: any;
  failedPercent: any;

  DateObj: any = new Date();
  dateRange = String(
    this.DateObj.getFullYear() +
      "/" +
      (this.DateObj.getMonth() + 1) +
      "/" +
      this.DateObj.getDate()
  );
  newRange = `${this.dateRange} - ${this.dateRange}`;
  payload = {
    dateRange: this.newRange,
    terminalId: "",
    walletId: "",
    accountNumber: "",
    paymentMethod: "",
    cardRRN: "",
    transactionReference: "",
    phoneNumber: "",
    sequenceNumber: "",
    debitReference: "",
    product: "",
    transactionType: "",
    transactionStatus: "",
    transactionChannel: "",
    searchField: "",
    viewPage: "",
    vendType: "",
    vendor: "",
    transferProvider: "",
    virtualTID: "",
    clientReference: "",
    download: false,
  };

  constructor(
    private payvueservice: PayVueApiService,
    private toast: ToastService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    Observable.interval(10000).subscribe((val) => {
      console.log("called");
      this.getInterswitch(this.payload);
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

  getInterswitch(payload) {
    this.isData = undefined;
    console.log("calling get interswitch");

    const apiURL2 = `transactions/tran/report/summary/?range=range&handler=INTERSWITCH&startdate=2021-10-26&enddate=2021-10-26`;

    this.payvueservice
      .apiCall2(apiURL2, "get", payload)
      .then((data) => {
        console.log("Interswitch direct data", data);
        if (data.message == "success") {
          this.interswitch = data.data;

          console.log("response from server", this.interswitch);

          this.totalTransactions = this.interswitch.totalTransactions;
          this.approvedTransactions = this.interswitch.approvedTransactions;
          this.failedTransactions = this.interswitch.failedTransactions;
          this.pendingTransactions = this.interswitch.pendingTransactions;
          this.approvedPercent = this.interswitch.approvedPercent;
          this.failedPercent = this.interswitch.failedPercent;

          this.isData = true;
          this.loading = false;
        } else {
          this.isData = false;
          this.loading = false;
        }
      })
      .catch((error) => {
        console.log("unavailable");
        this.isData = false;
        this.loading = false;
      });
  }
}
