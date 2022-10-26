import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BoxesComponent} from './boxes/boxes.component';
import {BoxDetailComponent} from './box-detail/box-detail.component';
import {FormsModule} from "@angular/forms";
import {MessagesComponent} from './messages/messages.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './header/header.component';
import { BoxCreateComponent } from './box-create/box-create.component';

@NgModule({
  declarations: [
    AppComponent,
    BoxesComponent,
    BoxDetailComponent,
    MessagesComponent,
    HeaderComponent,
    BoxCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
