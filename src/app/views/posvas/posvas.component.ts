import { Component, OnInit } from "@angular/core";
import { PayVueApiService } from "app/providers/payvue-api.service";
import eventsService from "app/providers/events.service";
import { ToastService } from "ng-uikit-pro-standard";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/observable/interval";
import { Observable } from "rxjs";
@Component({
  selector: "app-posvas",
  templateUrl: "./posvas.component.html",
  styleUrls: ["./posvas.component.scss"],
})
export class PosvasComponent implements OnInit {
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

  posvas: any;

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
      this.getposvas(this.payload);
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

  getposvas(payload) {
    this.isData = undefined;
    console.log("calling get posvas");

    const apiURL2 = `transactions/tran/report/summary/?range=range&handler=POSVAS&startdate=2021-10-26&enddate=2021-10-26`;

    this.payvueservice
      .apiCall2(apiURL2, "get", payload)
      .then((data) => {
        console.log("posvas direct data", data);
        if (data.message == "success") {
          this.posvas = data.data;

          console.log("response from server", this.posvas);

          this.totalTransactions = this.posvas.totalTransactions;
          this.approvedTransactions = this.posvas.approvedTransactions;
          this.failedTransactions = this.posvas.failedTransactions;
          this.pendingTransactions = this.posvas.pendingTransactions;
          this.approvedPercent = this.posvas.approvedPercent;
          this.failedPercent = this.posvas.failedPercent;

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
