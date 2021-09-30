import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../../shared/guards/authGuard";
import { RoleGuard } from "../../shared/guards/roleGuard";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MDBBootstrapModule, ModalModule } from "ng-uikit-pro-standard";
import { SharedModule } from "../../shared/shared.module";
import { CalendarModule } from "angular-calendar";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { CommonModule } from "@angular/common";

import { PaginationModule2 } from "../../views/pagination/pagination.module";
import { TerminalComponent } from "./terminal.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: TerminalComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          allowedRoles: [""],
        },
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule,

    SharedModule,
    PaginationModule2,
    CalendarModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
  ],
  exports: [],
  declarations: [TerminalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class TerminalModule {}
