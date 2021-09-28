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
  loading: boolean;
  date: string;
  status: any;
  arr: any[] = [];
  newarr: any[] = [];
  details: any;
  unassignedstat: any[] = [];
  tableData: any[] = [];
  masterSelected: boolean;
  checklist: any;
  checkedList: any;
  page = 1;
  limit = 50;
  serial = 0;
  isAdmin: boolean;
  isAgent: boolean;
  error: boolean = false;
  start: string;
  end: string;

  merchants: any;
  merchant: any;
  // terminalId: any;

  merchantId: any;
  contactName: any;
  email: any;
  phone: any;
  description: any;
  fax: any;
  organisation: any;
  createdAt: any;
  updatedAt: any;
  id: any;
  edit: boolean;

  constructor(
    private payvueservice: PayVueApiService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.getMerchants();
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

  all: boolean;
  checkAll() {
    for (var i = 0; i < this.merchants.length; i++) {
      this.merchants[i].isSelected = this.masterSelected;
      if (this.masterSelected) {
        console.log("true");
        this.arr.push({ id: this.merchants[i].merchantId });
        // this.merchants.map(merchant=>{
        //
        // })
      } else {
        console.log("false");
        this.arr = [];
      }
    }
    console.log(this.arr, "array");
  }

  getMerchants() {
    this.isData = undefined;

    let page = this.page < 1 ? 1 : this.page;
    this.loading = true;
    const apiURL = `merchant/get-all-merchants?size=4&page_num=1`;

    this.payvueservice
      .apiCall(apiURL)
      .then((data) => {
        if (data.status == 200) {
          this.serial = 1 + (this.page - 1) * this.limit;
          this.merchants = data.data.rows;

          this.isData = true;
          this.loading = false;
        } else {
          this.isData = false;
          this.loading = false;
          // this.itemCount = 1;
        }
      })
      .catch((error) => {
        console.log(error);
        this.isData = false;
        this.loading = false;
        // this.itemCount = 1;
      });
  }
  getMerchant(modal, status) {
    this.loading = true;
    this.edit = status;
    if (this.arr.length !== 1) {
      this.toast.warning("Please select one merchant");
      return;
    }
    this.isData = undefined;

    let id = this.arr[0].id;

    const apiURL = `merchant//get-all-merchant-contacts/${id}`;

    this.payvueservice
      .apiCall(apiURL)
      .then((data) => {
        if (data.status == 200) {
          this.serial = 1 + (this.page - 1) * this.limit;
          this.merchant = data.data;
          modal.show();
          this.toast.success(data.message);

          console.log(this.merchant);
          if (status) {
            this.merchantId = this.merchant.merchantId;
            this.contactName = this.merchant.contactName;
            this.email = this.merchant.email;
            this.phone = this.merchant.phone;
            this.organisation = this.merchant.organisation;
            this.fax = this.merchant.fax;
            this.createdAt = this.merchant.createdAt;
            this.description = this.merchant.description;
            this.updatedAt = this.merchant.updatedAt;
          }
          this.isData = true;
          this.loading = false;
        } else {
          this.isData = false;
          this.loading = false;
          // this.itemCount = 1;
        }
      })
      .catch((error) => {
        console.log(error);
        this.isData = false;
        this.loading = false;
        // this.itemCount = 1;
      });
  }
  deleteMerchant() {
    if (this.arr.length !== 1) {
      this.toast.warning("Please select one merchant");
      return;
    }
    this.isData = undefined;

    let id = this.arr[0].id;

    const apiURL = `merchant/delete/${id}`;

    this.payvueservice
      .apiCall(apiURL)
      .then((data) => {
        if (data.status == 200) {
          this.serial = 1 + (this.page - 1) * this.limit;
          this.getMerchants();

          this.toast.success(data.message);
        } else {
          this.isData = false;
          this.loading = false;
          // this.itemCount = 1;
        }
      })
      .catch((error) => {
        console.log(error);
        this.isData = false;
        this.loading = false;
        // this.itemCount = 1;
      });
  }

  toogleStatus() {
    if (this.arr.length !== 1) {
      this.toast.warning("Please select one merchant");
      return;
    }
    this.isData = undefined;

    let id = this.arr[0].id;

    const apiURL = `terminal/toggle-status/${id}`;

    this.payvueservice
      .apiCall(apiURL, "put")
      .then((data) => {
        if (data.status == 200) {
          this.serial = 1 + (this.page - 1) * this.limit;
          this.getMerchants();

          this.toast.success(data.message);
        } else {
          this.isData = false;
          this.loading = false;
          // this.itemCount = 1;
        }
      })
      .catch((error) => {
        console.log(error);
        this.isData = false;
        this.loading = false;
        // this.itemCount = 1;
      });
  }

  addMerchant() {
    if (!this.merchantId) this.error = true;
    if (!this.contactName) this.error = true;
    if (!this.email) this.error = true;
    if (!this.phone) this.error = true;
    if (!this.fax) this.error = true;
    if (!this.description) this.error = true;
    if (!this.organisation) this.error = true;
    if (!this.createdAt) this.error = true;
    if (!this.updatedAt) this.error = true;
    if (this.error) {
      this.toast.warning("Please recheck input fields");
    } else {
      this.isData = undefined;

      this.loading = true;

      const apiURL = `merchant/create`;
      const form = {
        merchantID: this.merchantId,
        contactName: this.contactName,
        email: this.email,
        description: this.description,
        phone: this.phone,
        fax: this.fax,
        organisation: this.organisation,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      };
      this.payvueservice
        .apiCall(apiURL, "post", form)
        .then((data) => {
          if (data.status == 200) {
            this.loading = true;
            this.getMerchants();
            this.toast.success(data.message);
          } else {
            this.isData = false;
            this.loading = false;
            // this.itemCount = 1;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isData = false;
          this.loading = false;
          // this.itemCount = 1;
        });
    }
  }

  editMerchant() {
    if (!this.merchantId) this.error = true;
    if (!this.contactName) this.error = true;
    if (!this.email) this.error = true;
    if (!this.phone) this.error = true;
    if (!this.fax) this.error = true;
    if (!this.description) this.error = true;
    if (!this.organisation) this.error = true;
    if (!this.createdAt) this.error = true;
    if (!this.updatedAt) this.error = true;
    if (this.error) {
      this.toast.warning("Please recheck input fields");
    } else {
      this.loading = true;
      const form = {
        id: this.id,
        merchantId: this.merchantId,
        contactName: this.contactName,
        email: this.email,
        description: this.description,
        phone: this.phone,
        fax: this.fax,
        organisation: this.organisation,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      };
      const apiURL = `merchant/edit`;

      this.payvueservice
        .apiCall(apiURL, "put", form)
        .then((data) => {
          if (data.status == 200) {
            this.loading = false;
            this.getMerchants();

            this.toast.success(data.message);
          } else {
            this.isData = false;
            this.loading = false;
            // this.itemCount = 1;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isData = false;
          this.loading = false;
          // this.itemCount = 1;
        });
    }
  }
}
