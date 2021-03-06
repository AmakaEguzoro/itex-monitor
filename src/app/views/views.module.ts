import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastModule } from "ng-uikit-pro-standard";
import { CalendarModule } from "angular-calendar";
import { SharedModule } from "../shared/shared.module";
import { LoginComponent } from "./auth/login/login.component";

import { ModalModule } from "ngx-bootstrap/modal";

import { PaginationModule2 } from "./pagination/pagination.module";
import { MonitorComponent } from "./monitor/monitor.component";
import { EpmsComponent } from './epms/epms.component';
import { InterswitchComponent } from './interswitch/interswitch.component';
import { MwtamsComponent } from './mwtams/mwtams.component';
import { TamsComponent } from './tams/tams.component';
import { UplsComponent } from './upls/upls.component';
import { VasComponent } from './vas/vas.component';
import { PosvasComponent } from './posvas/posvas.component';
// import { PtspsComponent } from './dashboards/ptsps/ptsps.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    PaginationModule2,

    SharedModule,
    ToastModule.forRoot(),
    CalendarModule.forRoot(),
    ModalModule.forRoot(),
  ],
  declarations: [LoginComponent, MonitorComponent, EpmsComponent, InterswitchComponent, MwtamsComponent, TamsComponent, UplsComponent, VasComponent, PosvasComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ViewsModule {}
