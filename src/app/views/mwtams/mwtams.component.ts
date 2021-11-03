import { Component, OnInit } from "@angular/core";
import { PayVueApiService } from "app/providers/payvue-api.service";
import eventsService from "app/providers/events.service";
import { ToastService } from "ng-uikit-pro-standard";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/observable/interval";
import { Observable } from "rxjs";
@Component({
  selector: "app-mwtams",
  templateUrl: "./mwtams.component.html",
  styleUrls: ["./mwtams.component.scss"],
})
export class MwtamsComponent implements OnInit {
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

  mwtams: any;

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
      this.getmwtams(this.payload);
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

  getmwtams(payload) {
    this.isData = undefined;
    console.log("calling get mwtams");

    const apiURL2 = `transactions/tran/report/summary/?range=range&handler=MW-FEP&startdate=2021-10-26&enddate=2021-10-26`;

    this.payvueservice
      .apiCall2(apiURL2, "get", payload)
      .then((data) => {
        console.log("mwtams direct data", data);
        if (data.message == "success") {
          this.mwtams = data.data;

          console.log("response from server", this.mwtams);

          this.totalTransactions = this.mwtams.totalTransactions;
          this.approvedTransactions = this.mwtams.approvedTransactions;
          this.failedTransactions = this.mwtams.failedTransactions;
          this.pendingTransactions = this.mwtams.pendingTransactions;
          this.approvedPercent = this.mwtams.approvedPercent;
          this.failedPercent = this.mwtams.failedPercent;

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
