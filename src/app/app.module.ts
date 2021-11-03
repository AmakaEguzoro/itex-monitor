import { ToastModule } from "ng-uikit-pro-standard";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA,
} from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { AppRoutes } from "./app.routes.service";
import { ViewsModule } from "./views/views.module";
import { SharedModule } from "./shared/shared.module";
import { MDBSpinningPreloader } from "ng-uikit-pro-standard";

import { ErrorModule } from "./views/errors/error.module";

// main layout

import { PayVueApiService } from "./providers/payvue-api.service";

import { PaginationModule } from "ngx-bootstrap/pagination";
import { CanDeactivateGuard } from "./shared/guards/CanDeactivateGuard";
import { NavigationComponent } from "./main-layout/navigation/navigation.component";
@NgModule({
  declarations: [AppComponent, NavigationComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,

    AppRoutes,
    RouterModule,
    FormsModule,
    SharedModule,
    ViewsModule,
    ErrorModule,
    ToastModule.forRoot(),
    ReactiveFormsModule,
    PaginationModule.forRoot(),
  ],
  providers: [MDBSpinningPreloader, PayVueApiService, CanDeactivateGuard],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
