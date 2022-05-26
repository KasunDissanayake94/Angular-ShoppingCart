import { LoginComponent } from "./login/login.component";
import { Routes } from "@angular/router";
import { IndexComponent } from "./index.component";
import {UserAccountComponent} from "../../pages/user/user-account/user-account.component";

export const IndexRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: IndexComponent,
      },
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "users",
        component: UserAccountComponent,
      },
    ],
  },
];
