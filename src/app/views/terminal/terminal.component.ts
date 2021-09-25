import { Component, OnInit } from "@angular/core";
import { PayVueApiService } from "app/providers/payvue-api.service";
import eventsService from "app/providers/events.service";
import { ToastService } from "ng-uikit-pro-standard";
@Component({
  selector: "app-terminal",
  templateUrl: "./terminal.component.html",
  styleUrls: ["./terminal.component.scss"],
})
export class TerminalComponent implements OnInit {
  isData: boolean;
  isLoading: boolean;
  date: string;
  status: any;
  arr: any[]=[];
  newarr: any[] = [];
  details: any;
  unassignedstat: any[] = [];
  tableData: any[] = [];
  masterSelected:boolean;
  checklist:any;
  checkedList:any;
  page = 1;
  limit = 50;
  serial = 0;
  isAdmin: boolean;
  isAgent: boolean;

  start: string;
  end: string;

  terminals: any;
  terminal: any;
  terminalId: any;
  application: any;
  firmware: any;
  modelId: any;
  expirationDate: any;
  applicationId: any;
  capkId: any;
  createdAt: any;

  constructor(
    private payvueservice: PayVueApiService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.getTerminals();
  }
  getUnassigned(status,id){
    if (status){
      if(this.arr.includes(id)){
        return
      }else{
        this.arr.push({id})
      }

    }
    else if(!status){
   this.arr=   this.arr.filter((item)=>item.id!==id)
    } 
    console.log(this.arr,"arr")
  }
 
  all:boolean
  checkAll(){
    for(var i=0; i<this.terminals.length;i++){
      this.terminals[i].isSelected = this.masterSelected;
      if(this.masterSelected){
      console.log("true")
      this.arr.push({id:this.terminals[i].merchantID})
      // this.merchants.map(merchant=>{
      //   
      // })
     
      }
      else{
        console.log("false")
this.arr=[]
      }
    }
    console.log(this.arr,"array")
  }

  getTerminals() {
    this.isData = undefined;

    let page = this.page < 1 ? 1 : this.page;

    const apiURL = `terminal/all-terminals`;

    this.payvueservice
      .apiCall(apiURL)
      .then((data) => {
        if (data.status == 200) {
          this.serial = 1 + (this.page - 1) * this.limit;
          this.terminals = data.data.rows;

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
  getTerminal(modal){
    if (this.arr.length!==1){
      this.toast.warning("Please select one terminal")
    return
    }
    this.isData = undefined;

let id=this.arr[0].id

    const apiURL = `terminal/get-single-terminal/${id}`;

    this.payvueservice
      .apiCall(apiURL)
      .then((data) => {
        if (data.status == 200) {
          this.serial = 1 + (this.page - 1) * this.limit;
          this.terminal = data.data;
          modal.show()
this.toast.success(data.message)
console.log(this.terminal)
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
  deleteTerminal(){
    if (this.arr.length!==1){
      this.toast.warning("Please select one terminal")
    return
    }
    this.isData = undefined;

   
let id=this.arr[0].id

    const apiURL = `terminal/delete/${id}`;

    this.payvueservice
      .apiCall(apiURL)
      .then((data) => {
        if (data.status == 200) {
          this.serial = 1 + (this.page - 1) * this.limit;
         this.getTerminals()
         
this.toast.success(data.message)

         


        
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

  toogleStatus(){
    if (this.arr.length!==1){
      this.toast.warning("Please select one terminal")
    return
    }
    this.isData = undefined;

   
let id=this.arr[0].id

    const apiURL = `terminal/toggle-status/${id}`;

    this.payvueservice
      .apiCall(apiURL)
      .then((data) => {
        if (data.status == 200) {
          this.serial = 1 + (this.page - 1) * this.limit;
         this.getTerminals()
         
this.toast.success(data.message)

         


        
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
