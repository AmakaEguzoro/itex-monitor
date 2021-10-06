import { Component, OnInit } from "@angular/core";
import { PayVueApiService } from "app/providers/payvue-api.service";
import eventsService from "app/providers/events.service";
import { ToastService } from "ng-uikit-pro-standard";
@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
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

  users: any;
  user: any;

  userId: any;
  email: any;
  phone: any;
  description: any;
  organisation: any;
  createdAt: any;
  updatedAt: any;
  id: any;
  edit: boolean;
  companyName: any;
  role: any;
  lastLoggedIn: any;
  username: any;

  constructor(
    private payvueservice: PayVueApiService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.getUsers();
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
    for (var i = 0; i < this.users.length; i++) {
      this.users[i].isSelected = this.masterSelected;
      if (this.masterSelected) {
        console.log("true");
        this.arr.push({ id: this.users[i].userId });
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

  getUsers() {
    this.isData = undefined;

    let page = this.page < 1 ? 1 : this.page;
    this.loading = true;
    const apiURL = `user/all-users`;

    this.payvueservice
      .apiCall(apiURL)
      .then((data) => {
        if (data.status == 200) {
          this.serial = 1 + (this.page - 1) * this.limit;
          this.users = data.data.rows;

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
  getUser(modal, status) {
    this.loading = true;
    this.edit = status;
    if (this.arr.length !== 1) {
      this.toast.warning("Please select one user");
      return;
    }
    this.isData = undefined;

    let id = this.arr[0].id;

    const apiURL = `user/get-single-user/${id}`;

    this.payvueservice
      .apiCall(apiURL)
      .then((data) => {
        if (data.status == 200) {
          this.serial = 1 + (this.page - 1) * this.limit;
          this.user = data.data;
          modal.show();
          this.toast.success(data.message);

          console.log(this.user);
          if (status) {
            this.userId = this.user.id;
            this.username = this.user.username;
            this.email = this.user.email;
            this.companyName = this.user.companyName;
            this.role = this.user.role;
            this.lastLoggedIn = this.user.lastLoggedIn;
            this.createdAt = this.user.createdAt;
            this.updatedAt = this.user.updatedAt;
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
  deleteUser() {
    if (this.arr.length !== 1) {
      this.toast.warning("Please select one user");
      return;
    }
    this.isData = undefined;

    let id = this.arr[0].id;

    const apiURL = `user/delete-user/${id}`;

    this.payvueservice
      .apiCall(apiURL)
      .then((data) => {
        if (data.status == 200) {
          this.serial = 1 + (this.page - 1) * this.limit;
          this.getUsers();

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
      this.toast.warning("Please select one user");
      return;
    }
    this.isData = undefined;

    let id = this.arr[0].id;

    const apiURL = `user/toggle-status/${id}`;

    this.payvueservice
      .apiCall(apiURL, "put")
      .then((data) => {
        if (data.status == 200) {
          this.serial = 1 + (this.page - 1) * this.limit;
          this.getUsers();

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

  addUser() {
    if (!this.id) this.error = true;
    if (!this.username) this.error = true;
    if (!this.email) this.error = true;
    if (!this.companyName) this.error = true;
    if (!this.role) this.error = true;
    if (!this.createdAt) this.error = true;
    if (!this.updatedAt) this.error = true;
    if (this.error) {
      this.toast.warning("Please recheck input fields");
    } else {
      this.isData = undefined;

      this.loading = true;

      const apiURL = `user/create`;
      const form = {
        userID: this.id,
        userName: this.username,
        email: this.email,
        companyName: this.companyName,
        role: this.role,
        lastLoggedIn: this.lastLoggedIn,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      };
      this.payvueservice
        .apiCall(apiURL, "post", form)
        .then((data) => {
          if (data.status == 200) {
            this.loading = true;
            this.getUsers();
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

  editUser() {
    if (!this.id) this.error = true;
    if (!this.username) this.error = true;
    if (!this.email) this.error = true;
    if (!this.companyName) this.error = true;
    if (!this.role) this.error = true;
    if (!this.createdAt) this.error = true;
    if (!this.updatedAt) this.error = true;
    if (this.error) {
      this.toast.warning("Please recheck input fields");
    } else {
      this.loading = true;
      const form = {
        userID: this.id,
        userName: this.username,
        email: this.email,
        companyName: this.companyName,
        role: this.role,
        lastLoggedIn: this.lastLoggedIn,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      };
      const apiURL = `user/edit-user`;

      this.payvueservice
        .apiCall(apiURL, "put", form)
        .then((data) => {
          if (data.status == 200) {
            this.loading = false;
            this.getUsers();

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
