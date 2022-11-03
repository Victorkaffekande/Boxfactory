import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserDto} from "../../interfaces/userDto";
import {LoginService} from "../../services/loginService";
import {Router} from "@angular/router";
import jwtDecode from "jwt-decode";
import {Token} from "../../interfaces/Token";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  }, {updateOn: 'submit'});

  displayRegister: Boolean = false;

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private router: Router) {
  }


  ngOnInit(): void {
  }

  async login() {
    if (this.loginForm.valid) {
      const dto: UserDto = {
        username: <string>this.loginForm.get("username")?.value,
        password: <string>this.loginForm.get("password")?.value,
      };
      var token = await this.loginService.login(dto);
      localStorage.setItem('token', token)

      let deToken = jwtDecode(token) as Token;
      if (deToken.role == "Admin") {
        await this.router.navigate(["/boxes"]);
      } else {
        await this.router.navigate(["/user"]);
      }
    }
  }

  registerBtn() {
    this.displayRegister = true;
  }
}
