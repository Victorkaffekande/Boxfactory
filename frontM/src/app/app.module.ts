import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Overlay} from "@angular/cdk/overlay";
import {ColorPickerModule} from "ngx-color-picker";
import {MatChipsModule} from "@angular/material/chips";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatListModule} from "@angular/material/list";
import {MatExpansionModule} from "@angular/material/expansion";
import { LoginComponent } from './login/login.component';
import { BoxesComponent } from './boxes/boxes.component';
import * as path from "path";
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import {AuthguardService} from "../services/authguard.service";
import {MatToolbarModule} from "@angular/material/toolbar";

const routes: Routes = [
  {
    path: 'boxes', component: BoxesComponent, canActivate: [AuthguardService]
  },
  {
    path: 'login', component: LoginComponent
  }

]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BoxesComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    ColorPickerModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatListModule,
    MatExpansionModule,
    MatToolbarModule
  ],
  providers: [MatSnackBar, Overlay],
  bootstrap: [AppComponent]
})
export class AppModule { }
