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
  loading: boolean;
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
error:boolean=false
  start: string;
  end: string;

  terminals: any;
  terminal: any;
  terminalId: any;

  applicationId: any;
  firmwareId: any;
  modelId: any;
  expDate: any;
 startDate:any
  capkId: any;
  caption:any;
  description:any;
  createdAt: any;
  id: any;
  edit: boolean;

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
this.loading=true;
    const apiURL = `terminal/all-terminals`;

    this.payvueservice
      .apiCall(apiURL)
      .then((data) => {
        if (data.status == 200) {
          this.serial = 1 + (this.page - 1) * this.limit;
          this.terminals = data.data.rows;

          this.isData = true;
          this.loading = false;
        } else {
          this.isData = false;
          this.loading= false;
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
  getTerminal(modal,status){
    this.loading=true;
    this.edit=status
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
if(status){
  this.id=this.terminal.id
  this.terminalId=this.terminal.terminalID
  this.firmwareId=this.terminal.firmwareId
  this.applicationId=this.terminal.applicationId
  this.capkId=this.terminal.capkId
  this.modelId=this.terminal.modelId
  this.caption=this.terminal.caption
  this.description=this.terminal.description
  this.startDate=new Date(this.terminal.startDate).toLocaleDateString('en-GB')
  this.expDate=new Date(this.terminal.expirationDate).toLocaleDateString('en-GB')

}
console.log(this.expDate,"exp date")
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

  toogleStatus(){
    if (this.arr.length!==1){
      this.toast.warning("Please select one terminal")
    return
    }
    this.isData = undefined;

   
let id=this.arr[0].id

    const apiURL = `terminal/toggle-status/${id}`;

    this.payvueservice
      .apiCall(apiURL,'put')
      .then((data) => {
        if (data.status == 200) {
          this.serial = 1 + (this.page - 1) * this.limit;
          this.arr=[]
          this.masterSelected=false
         this.getTerminals()
         
this.toast.success(data.message)

         


        
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

  addTerminal(){

if (!this.terminalId) this.error=true
if (!this.applicationId) this.error=true
if (!this.modelId) this.error=true
if (!this.firmwareId) this.error=true
if (!this.caption) this.error=true
if (!this.description) this.error=true
if (!this.startDate) this.error=true
if (!this.expDate) this.error=true
if(!this.capkId)this.error=true
if(this.error){
  this.toast.warning(
    "Please recheck input fields")
}else{



    this.isData = undefined;

   this.loading=true


    const apiURL = `terminal/create`;
const form={
  modelId:this.modelId,
  terminalID:this.terminalId,
  caption:this.caption,
  description:this.description,
  startDate:this.startDate,
  expirationDate:this.expDate,
  applicationId:this.applicationId,
  firmwareId:this.firmwareId,
  capkId:this.capkId
}
    this.payvueservice
      .apiCall(apiURL,'post',form)
      .then((data) => {
        if (data.status == 200) {
          this.loading=true
         this.getTerminals()   
this.toast.success(data.message)      
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

  editTerminal(){
    if (!this.terminalId) this.error=true
    if (!this.applicationId) this.error=true
    if (!this.modelId) this.error=true
    if (!this.firmwareId) this.error=true
    if (!this.caption) this.error=true
    if (!this.description) this.error=true
    if (!this.startDate) this.error=true
    if (!this.expDate) this.error=true
    if(!this.capkId)this.error=true
    if(this.error){
      this.toast.warning(
        "Please recheck input fields")
    }else{
      this.loading=true;
      const form={
        id:this.id,
        modelId:this.modelId,
        terminalID:this.terminalId,
        caption:this.caption,
        description:this.description,
        startDate:this.startDate,
        expirationDate:this.expDate,
        applicationId:this.applicationId,
        firmwareId:this.firmwareId,
        capkId:this.capkId
      }
    const apiURL = `terminal/edit`;

    this.payvueservice
      .apiCall(apiURL,'put',form)
      .then((data) => {
        if (data.status == 200) {
         this.loading=false
         this.getTerminals()
         
this.toast.success(data.message)

         


        
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
