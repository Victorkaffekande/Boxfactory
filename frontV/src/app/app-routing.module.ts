import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {BoxesComponent} from "./boxes/boxes.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {BoxDetailComponent} from "./box-detail/box-detail.component";

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'boxes', component: BoxesComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'detail/:id', component: BoxDetailComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
