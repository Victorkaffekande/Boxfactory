import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: any;
  password: any;

  constructor(private http: HttpService) { }

  ngOnInit(): void {
  }

  async login() {
    let dto = {
      username: this.username,
      password: this.password
    }
    this.http.userName = this.username;
    var token = await this.http.login(dto);
    localStorage.setItem('token', token)
  }

}
