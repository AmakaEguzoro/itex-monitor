import { Component, OnInit } from "@angular/core";
import { PayVueApiService } from "app/providers/payvue-api.service";
import eventsService from "app/providers/events.service";
import { ToastService } from "ng-uikit-pro-standard";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/observable/interval";
import { Observable } from "rxjs";
@Component({
  selector: "app-vas",
  templateUrl: "./vas.component.html",
  styleUrls: ["./vas.component.scss"],
})
export class VasComponent implements OnInit {
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

  vas: any;

  transactionCount: any;
  successfulCount: any;
  failedCount: any;
  initializedCount: any;
  successfulPercent: any;
  failedPercent: any;

  totalTransactions: any;
  approvedTransactions: any;
  failedTransactions: any;
  pendingTransactions: any;
  approvedPercent: any;

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
      this.getVas(this.payload);
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

  getVas(payload) {
    this.isData = undefined;
    console.log("calling get vas");

    const apiURL = `transaction/details/summary`;

    this.payvueservice
      .apiCall(apiURL, "post", payload)
      .then((data) => {
        if (data.http_code == 200) {
          this.vas = data.data;

          console.log("response from server", this.vas);

          this.transactionCount = this.vas.transactionCount;
          this.successfulCount = this.vas.successfulCount;
          this.successfulPercent = this.vas.successfulPercent;
          this.failedCount = this.vas.failedCount;
          this.failedPercent = this.vas.failedPercent;
          this.initializedCount = this.vas.initializedCount;

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
