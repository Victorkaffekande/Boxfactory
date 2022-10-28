import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {BoxesComponent} from "./boxes/boxes.component";
import {BoxDetailComponent} from "./box-detail/box-detail.component";
import {BoxCreateComponent} from "./box-create/box-create.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path: 'boxes', component: BoxesComponent},
  {path: 'detail/:id', component: BoxDetailComponent},
  {path: 'create', component: BoxCreateComponent},
  {path: '', component: LoginComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
