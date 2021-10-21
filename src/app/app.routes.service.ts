import { AlertComponent } from "./shared/alerts/alert/alert.component";
import { RouterModule, Route, PreloadAllModules } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { NotFoundComponent } from "./views/errors/not-found/not-found.component";

// user management
import { AuthGuard } from "./shared/guards/authGuard";
import { RoleGuard } from "./shared/guards/roleGuard";
import { LoginComponent } from "./views/auth/login/login.component";

import { MonitorComponent } from "./views/monitor/monitor.component";

// import { PtspDetailComponent } from './views/dashboards/ptsp-detail/ptsp-detail.component';

const routes: Route[] = [
  { path: "login", component: LoginComponent },

  {
    path: "",
    component: MonitorComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      allowedRoles: [""],
    },
    children: [
      {
        path: "monitor",
        component: MonitorComponent,
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
