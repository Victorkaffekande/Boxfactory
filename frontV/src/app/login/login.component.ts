import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserDto} from "../../interfaces/userDto";
import {LoginService} from "../../services/loginService";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
              private loginService: LoginService) {
  }


  ngOnInit(): void {
  }

 async login() {
    const dto: UserDto = {
      username: <string>this.loginForm.get("username")?.value,
      password: <string>this.loginForm.get("password")?.value,
      role:"Admin"
    };
    var token = await this.loginService.login(dto);
    localStorage.setItem('token', token)
  }

}
