import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastModule } from "ng-uikit-pro-standard";
import { CalendarModule } from "angular-calendar";
import { SharedModule } from "../shared/shared.module";

import { FooterComponent } from "../main-layout/footer/footer.component";
import { LoginComponent } from "./auth/login/login.component";

import { ModalModule } from "ngx-bootstrap/modal";

import { PaginationModule2 } from "./pagination/pagination.module";
import { TerminalModule } from "./terminal/terminal.module";
import { ApplicationModule } from "./application/application.module";
import { CapkModule } from "./capk/capk.module";
import { ModelModule } from "./model/model.module";
import { MerchantModule } from "./merchant/merchant.module";
// import { PtspsComponent } from './dashboards/ptsps/ptsps.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    // TransactionHistoryTableModule,
    CapkModule,
    ApplicationModule,
    MerchantModule,
    TerminalModule,
    ModelModule,
    PaginationModule2,

    SharedModule,
    ToastModule.forRoot(),
    CalendarModule.forRoot(),
    ModalModule.forRoot(),
  ],
  declarations: [FooterComponent, LoginComponent],
  exports: [FooterComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ViewsModule {}
