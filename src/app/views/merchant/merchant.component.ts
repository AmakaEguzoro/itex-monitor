import { Component, OnInit } from "@angular/core";
import { PayVueApiService } from "app/providers/payvue-api.service";
import eventsService from "app/providers/events.service";
import { ToastService } from "ng-uikit-pro-standard";
@Component({
  selector: "app-merchant",
  templateUrl: "./merchant.component.html",
  styleUrls: ["./merchant.component.scss"],
})
export class MerchantComponent implements OnInit {
  isData: boolean;
  isLoading: boolean;
  date: string;
  status: any;
  arr: any[] = [];
  newarr: any[] = [];
  details: any;

  tableData: any[] = [];

  page = 1;
  limit = 50;
  serial = 0;
  isAdmin: boolean;
  isAgent: boolean;

  start: string;
  end: string;

  merchants: any;

  constructor(
    private payvueservice: PayVueApiService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.getMerchants();
  }

  getMerchants() {
    this.isData = undefined;

    let page = this.page < 1 ? 1 : this.page;

    const apiURL = `merchant/get-all-merchants?size=4&page_num=1`;

    this.payvueservice
      .apiCall(apiURL)
      .then((data) => {
        if (data.status == 200) {
          this.serial = 1 + (this.page - 1) * this.limit;
          this.merchants = data.data.rows;

          this.isData = true;
          this.isLoading = false;
        } else {
          this.isData = false;
          this.isLoading = false;
          // this.itemCount = 1;
        }
      })
      .catch((error) => {
        console.log(error);
        this.isData = false;
        this.isLoading = false;
        // this.itemCount = 1;
      });
  }
}
