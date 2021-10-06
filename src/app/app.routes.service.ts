import { AlertComponent } from "./shared/alerts/alert/alert.component";
import { RouterModule, Route, PreloadAllModules } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { NotFoundComponent } from "./views/errors/not-found/not-found.component";

// user management
import { AuthGuard } from "./shared/guards/authGuard";
import { RoleGuard } from "./shared/guards/roleGuard";
import { LoginComponent } from "./views/auth/login/login.component";

import { MerchantComponent } from "./views/merchant/merchant.component";

// import { PtspDetailComponent } from './views/dashboards/ptsp-detail/ptsp-detail.component';

const routes: Route[] = [
  { path: "login", component: LoginComponent },

  {
    path: "terminal",
    loadChildren: "./views/terminal/terminal.module#TerminalModule",
  },
  {
    path: "model",
    loadChildren: "./views/model/model.module#ModelModule",
  },
  {
    path: "application",
    loadChildren: "./views/application/application.module#ApplicationModule",
  },
  {
    path: "capk",
    loadChildren: "./views/capk/capk.module#CapkModule",
  },
  {
    path: "users",
    loadChildren: "./views/users/users.module#UsersModule",
  },
  {
    path: "",
    component: MerchantComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      allowedRoles: [""],
    },
    children: [
      {
        path: "merchant",
        component: MerchantComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: {
          allowedRoles: [""],
        },
      },
    ],
  },

  { path: "auth", loadChildren: "./views/auth/auth.module#AuthModule" },

  { path: "alerts", component: AlertComponent },
  { path: "**", component: NotFoundComponent },
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules,
  relativeLinkResolution: "legacy",
});
