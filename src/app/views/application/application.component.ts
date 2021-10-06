import { Component, OnInit } from "@angular/core";
import { PayVueApiService } from "app/providers/payvue-api.service";
import eventsService from "app/providers/events.service";
import { ToastService } from "ng-uikit-pro-standard";
@Component({
  selector: "app-application",
  templateUrl: "./application.component.html",
  styleUrls: ["./application.component.scss"],
})
export class ApplicationComponent implements OnInit {
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

  applications: any;
  application: any;
  applicationId: any;

  applicationVersion: any;
  applicationName: any;
  programFileName: any;
  programFileVersion: any;
  createdAt: any;
<<<<<<< HEAD
  organisation: any;
=======
  organization: any;
>>>>>>> 7377f11fc7386e3d2fa4af353f8262ee4fba351a
  notDownloadEDCParameters: any;
  removable: any;
  modelId: any;
  expirationDate: any;
  firmwareId: any;
  updatedAt: any;
  startDate: any;
  capkId: any;
  caption: any;
  description: any;
  limitDownloadInterval: any;
  notDownloadENVParameters: any;
  archived: any;
  // createdAt: any;
  id: any;
  edit: boolean;

  constructor(
    private payvueservice: PayVueApiService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.getApplications();
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
    for (var i = 0; i < this.applications.length; i++) {
      this.applications[i].isSelected = this.masterSelected;
      if (this.masterSelected) {
        console.log("true");
        this.arr.push({ id: this.applications[i].merchantID });
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

  getApplications() {
    this.isData = undefined;

    let page = this.page < 1 ? 1 : this.page;
    this.loading = true;
    const apiURL = `application/get-applications`;

    this.payvueservice
      .apiCall(apiURL)
      .then((data) => {
        if (data.status == 200) {
          this.serial = 1 + (this.page - 1) * this.limit;
          this.applications = data.data.rows;

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
  getApplication(modal, status) {
    this.loading = true;
    this.edit = status;
    if (this.arr.length !== 1) {
      this.toast.warning("Please select one application");
      return;
    }
    this.isData = undefined;

    let id = this.arr[0].id;

    const apiURL = `application/get-single/${id}`;

    this.payvueservice
      .apiCall(apiURL)
      .then((data) => {
        if (data.status == 200) {
          this.serial = 1 + (this.page - 1) * this.limit;
          this.application = data.data;
          modal.show();
          this.toast.success(data.message);

          console.log(this.application);
          if (status) {
            this.applicationName = this.application.name;
            this.applicationVersion = this.application.applicationVersion;
            this.firmwareId = this.application.firmwareId;
            this.programFileName = this.application.programFileName;
            this.programFileVersion = this.application.programFileVersion;
            this.createdAt = this.application.createdAt;
<<<<<<< HEAD
            this.organisation = this.application.organisation;
=======
            this.organization = this.application.organization;
>>>>>>> 7377f11fc7386e3d2fa4af353f8262ee4fba351a
            this.notDownloadEDCParameters =
              this.application.notDownloadEDCParameters;
            this.capkId = this.application.capkId;
            this.modelId = this.application.modelId;
            this.caption = this.application.caption;
            this.description = this.application.description;
            this.startDate = this.application.startDate;
            this.expirationDate = this.application.expirationDate;
            this.updatedAt = this.application.updatedAt;
            this.notDownloadENVParameters =
              this.application.notDownloadENVParameters;
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
  deleteApplication() {
    if (this.arr.length !== 1) {
      this.toast.warning("Please select one application");
      return;
    }
    this.isData = undefined;

    let id = this.arr[0].id;

    const apiURL = `application/delete/${id}`;

    this.payvueservice
      .apiCall(apiURL)
      .then((data) => {
        if (data.status == 200) {
          this.serial = 1 + (this.page - 1) * this.limit;
          this.getApplications();

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
      this.toast.warning("Please select one application");
      return;
    }
    this.isData = undefined;

    let id = this.arr[0].id;

    const apiURL = `application/toggle-status/${id}`;

    this.payvueservice
      .apiCall(apiURL, "put")
      .then((data) => {
        if (data.status == 200) {
          this.serial = 1 + (this.page - 1) * this.limit;
          this.getApplications();

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

  addApplication() {
    if (!this.applicationName) this.error = true;
    if (!this.applicationVersion) this.error = true;
    if (!this.modelId) this.error = true;
    if (!this.programFileName) this.error = true;
<<<<<<< HEAD
    if (!this.organisation) this.error = true;
    // if (!this.firmwareId) this.error = true;
    // if (!this.caption) this.error = true;
    if (!this.description) this.error = true;
    if (!this.updatedAt) this.error = true;
    if (!this.expirationDate) this.error = true;
    // if (!this.capkId) this.error = true;
=======
    if (!this.organization) this.error = true;
    if (!this.description) this.error = true;
    if (!this.updatedAt) this.error = true;
    if (!this.expirationDate) this.error = true;
>>>>>>> 7377f11fc7386e3d2fa4af353f8262ee4fba351a
    if (this.error) {
      this.toast.warning("Please recheck input fields");
    } else {
      this.isData = undefined;

      this.loading = true;

      const apiURL = `application/create`;
      const form = {
        modelId: this.modelId,
<<<<<<< HEAD

        // caption: this.caption,
=======
        organization: this.organization,
>>>>>>> 7377f11fc7386e3d2fa4af353f8262ee4fba351a
        description: this.description,
        startDate: this.startDate,
        expirationDate: this.expirationDate,
        applicationId: this.applicationId,
        // firmwareId: this.firmwareId,
        // capkId: this.capkId,
      };
      this.payvueservice
        .apiCall(apiURL, "post", form)
        .then((data) => {
          if (data.status == 200) {
            this.loading = true;
            this.getApplications();
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

  editApplication() {
    if (!this.applicationId) this.error = true;
    if (!this.applicationId) this.error = true;
    if (!this.modelId) this.error = true;
<<<<<<< HEAD
    // if (!this.firmwareId) this.error = true;
=======
    if (!this.organization) this.error = true;
>>>>>>> 7377f11fc7386e3d2fa4af353f8262ee4fba351a
    // if (!this.caption) this.error = true;
    if (!this.description) this.error = true;
    if (!this.startDate) this.error = true;
    if (!this.expirationDate) this.error = true;
    // if (!this.capkId) this.error = true;
    if (this.error) {
      this.toast.warning("Please recheck input fields");
    } else {
      this.loading = true;
      const form = {
        id: this.id,
        modelId: this.modelId,
        applicationID: this.applicationId,
<<<<<<< HEAD
        // caption: this.caption,
=======
        organization: this.organization,
>>>>>>> 7377f11fc7386e3d2fa4af353f8262ee4fba351a
        description: this.description,
        startDate: this.startDate,
        expirationDate: this.expirationDate,
        applicationId: this.applicationId,
        // firmwareId: this.firmwareId,
        // capkId: this.capkId,
      };
      const apiURL = `application/edit`;

      this.payvueservice
        .apiCall(apiURL, "put", form)
        .then((data) => {
          if (data.status == 200) {
            this.loading = false;
            this.getApplications();

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
