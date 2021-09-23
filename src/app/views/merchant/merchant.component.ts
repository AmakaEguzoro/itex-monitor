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
  unassignedstat: any[] = [];
  tableData: any[] = [];

  page = 1;
  limit = 50;
  serial = 0;
  isAdmin: boolean;
  isAgent: boolean;

  start: string;
  end: string;

  merchants: any;
  masterSelected:boolean;
  checklist:any;
  checkedList:any;
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


  // checkUncheckAll() {
  //   for (var i = 0; i < this.unassignedstat.length; i++) {
  //     this.unassignedstat[i] = this.masterSelected;
  //   }
  //   // this.getCheckedItemList();
  //   console.log(this.masterSelected)
  // }

  

  // // Get List of Checked Items
  // getCheckedItemList(){
  //   this.checkedList = [];
  //   for (var i = 0; i < this.checklist.length; i++) {
  //     if(this.checklist[i].isSelected)
  //     this.checkedList.push(this.checklist[i]);
  //   }
  //   this.checkedList = JSON.stringify(this.checkedList);
  // }

  getUnassigned(status,serial,id,all){
    this.all!=status?status=this.all:status=this.all
    if (status){

this.arr.push({id,serial})
    }
    else if(!status){
   this.arr=   this.arr.filter((item)=>item.id!==id)
    } 

  }
  selectAll(){
   
  }
  all:boolean
  checkAll(){
    for(var i=0; i<this.merchants.length;i++){
      this.all=true
      console.log("here")
    }
    
  }
}
