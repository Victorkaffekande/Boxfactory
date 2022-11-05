import {Component, OnInit} from '@angular/core';
import {HttpService} from "../services/http.service";
import {NavigationEnd, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import jwtDecode from "jwt-decode";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentRoute: string = "";
  constructor(private router: Router,
              public http: HttpService,
              private snackBar: MatSnackBar) {
    // @ts-ignore
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // @ts-ignore
        this.currentRoute = event.url;
      }
    });
    let t = localStorage.getItem('token') as any;
    if(t) {
      let decoded = jwtDecode(t) as any;
      this.http.userName = decoded.username;
    }

  }

  route() {
    this.router.navigate(['./login'])
  }

  goToBoxes() {
    if(this.currentRoute=='/login') {
      this.router.navigate(['./boxes'])
    }
  }

  logOut() {
    this.router.navigate(['login']).then(() => {
      this.snackBar.open('You have now been logged out', undefined, {duration: 3000})
      localStorage.setItem('token', '');
      this.http.userName = undefined;
    })
  }
}

