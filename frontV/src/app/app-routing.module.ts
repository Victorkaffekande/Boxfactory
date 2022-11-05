import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {BoxesComponent} from "./boxes/boxes.component";
import {BoxDetailComponent} from "./box-detail/box-detail.component";
import {BoxCreateComponent} from "./box-create/box-create.component";
import {LoginComponent} from "./login/login.component";
import {AuthguardService} from "../services/authguard.service";
import {UserComponent} from "./user/user.component";

const routes: Routes = [
  {path: 'boxes', component: BoxesComponent, canActivate: [AuthguardService]},
  {path: 'create', component: BoxCreateComponent, canActivate: [AuthguardService]},
  {path: 'user', component: UserComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
