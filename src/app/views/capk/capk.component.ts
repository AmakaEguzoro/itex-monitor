import { Component, OnInit } from "@angular/core";
import { PayVueApiService } from "app/providers/payvue-api.service";
import eventsService from "app/providers/events.service";
import { ToastService } from "ng-uikit-pro-standard";
@Component({
  selector: "app-capk",
  templateUrl: "./capk.component.html",
  styleUrls: ["./capk.component.scss"],
})
export class CapkComponent implements OnInit {
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

  capks: any;
  capk: any;

  terminalID: any;
  issuer: any;
  exponent: any;
  ridIndex: any;
  ridList: any;
  modulus: any;
  keyType: any;
  keyLength: any;
  sha1: any;
  description: any;
  archived: boolean;
  applicationType: any;
  expirationDate: any;
  capkId: any;
  firmwareId: any;
  createdAt: any;
  updatedAt: any;
  id: any;
  edit: boolean;

  constructor(
    private payvueservice: PayVueApiService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.getCapks();
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
    for (var i = 0; i < this.capks.length; i++) {
      this.capks[i].isSelected = this.masterSelected;
      if (this.masterSelected) {
        console.log("true");
        this.arr.push({ id: this.capks[i].merchantID });
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

  getCapks() {
    this.isData = undefined;

    let page = this.page < 1 ? 1 : this.page;
    this.loading = true;
    const apiURL = `capk/all-capks`;

    this.payvueservice
      .apiCall(apiURL)
      .then((data) => {
        if (data.status == 200) {
          this.serial = 1 + (this.page - 1) * this.limit;
          this.capks = data.data.rows;

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
  getCapk(modal, status) {
    this.loading = true;
    this.edit = status;
    if (this.arr.length !== 1) {
      this.toast.warning("Please select one capk");
      return;
    }
    this.isData = undefined;

    let id = this.arr[0].id;

    const apiURL = `capk/get-single-capk/${id}`;

    this.payvueservice
      .apiCall(apiURL)
      .then((data) => {
        if (data.status == 200) {
          this.serial = 1 + (this.page - 1) * this.limit;
          this.capk = data.data;
          modal.show();
          this.toast.success(data.message);

          console.log(this.capk);
          if (status) {
            this.terminalID = this.capk.terminalID;
            this.issuer = this.capk.issuer;
            this.exponent = this.capk.exponent;
            this.ridIndex = this.capk.ridIndex;
            this.ridList = this.capk.ridList;
            this.modulus = this.capk.modulus;
            this.keyType = this.capk.keyType;
            this.keyLength = this.capk.keyLength;
            this.sha1 = this.capk.sha1;
            this.archived = this.capk.archived;
            this.applicationType = this.capk.applicationType;
            this.description = this.capk.description;
            this.updatedAt = this.capk.updatedAt;
            this.createdAt = new Date(this.capk.createdAt).toLocaleDateString(
              "en-GB"
            );
            this.expirationDate = new Date(
              this.capk.expirationDate
            ).toLocaleDateString("en-GB");
          }
          console.log(this.expirationDate, "exp date");
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
  deleteCapk() {
    if (this.arr.length !== 1) {
      this.toast.warning("Please select one capk");
      return;
    }
    this.isData = undefined;

    let id = this.arr[0].id;

    const apiURL = `capk/delete/${id}`;

    this.payvueservice
      .apiCall(apiURL)
      .then((data) => {
        if (data.status == 200) {
          this.serial = 1 + (this.page - 1) * this.limit;
          this.getCapks();

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
      this.toast.warning("Please select one capk");
      return;
    }
    this.isData = undefined;

    let id = this.arr[0].id;

    const apiURL = `capk/toggle-status/${id}`;

    this.payvueservice
      .apiCall(apiURL, "put")
      .then((data) => {
        if (data.status == 200) {
          this.serial = 1 + (this.page - 1) * this.limit;
          this.arr = [];
          this.masterSelected = false;
          this.getCapks();

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

  addCapk() {
    if (!this.terminalID) this.error = true;
    if (!this.issuer) this.error = true;
    if (!this.exponent) this.error = true;
    if (!this.ridIndex) this.error = true;
    if (!this.ridList) this.error = true;
    if (!this.modulus) this.error = true;
    if (!this.keyType) this.error = true;
    if (!this.keyLength) this.error = true;
    if (!this.sha1) this.error = true;
    if (!this.archived) this.error = true;
    if (!this.description) this.error = true;
    if (!this.applicationType) this.error = true;
    if (!this.expirationDate) this.error = true;
    if (!this.createdAt) this.error = true;
    if (!this.updatedAt) this.error = true;
    if (this.error) {
      this.toast.warning("Please recheck input fields");
    } else {
      this.isData = undefined;

      this.loading = true;

      const apiURL = `capk/create`;
      const form = {
        terminalID: this.terminalID,
        issuer: this.issuer,
        exponent: this.exponent,
        description: this.description,
        ridIndex: this.ridIndex,
        ridList: this.ridList,
        modulus: this.modulus,
        keyType: this.keyType,
        keyLenth: this.keyLength,
        sha1: this.sha1,
        archived: this.archived,
        applicationType: this.applicationType,
        expirationDate: this.expirationDate,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      };
      this.payvueservice
        .apiCall(apiURL, "post", form)
        .then((data) => {
          if (data.status == 200) {
            this.loading = true;
            this.getCapks();
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

  editCapk() {
    if (!this.terminalID) this.error = true;
    if (!this.issuer) this.error = true;
    if (!this.exponent) this.error = true;
    if (!this.ridIndex) this.error = true;
    if (!this.ridList) this.error = true;
    if (!this.modulus) this.error = true;
    if (!this.keyType) this.error = true;
    if (!this.keyLength) this.error = true;
    if (!this.sha1) this.error = true;
    if (!this.archived) this.error = true;
    if (!this.description) this.error = true;
    if (!this.applicationType) this.error = true;
    if (!this.expirationDate) this.error = true;
    if (!this.createdAt) this.error = true;
    if (!this.updatedAt) this.error = true;
    if (this.error) {
      this.toast.warning("Please recheck input fields");
    } else {
      this.loading = true;
      const form = {
        terminalID: this.terminalID,
        issuer: this.issuer,
        exponent: this.exponent,
        description: this.description,
        ridIndex: this.ridIndex,
        ridList: this.ridList,
        modulus: this.modulus,
        keyType: this.keyType,
        keyLenth: this.keyLength,
        sha1: this.sha1,
        archived: this.archived,
        applicationType: this.applicationType,
        expirationDate: this.expirationDate,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      };
      const apiURL = `capk/edit`;

      this.payvueservice
        .apiCall(apiURL, "put", form)
        .then((data) => {
          if (data.status == 200) {
            this.loading = false;
            this.getCapks();

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
