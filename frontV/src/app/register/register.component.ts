import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {UserDto} from "../../interfaces/userDto";
import {LoginService} from "../../services/loginService";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    passwordConfirm: ['', Validators.required],
    role: [new FormControl(null), Validators.required]
  }, {
    updateOn: 'submit',
    validators: this.passwordValidator('password', 'passwordConfirm')
  });

  roles: string[] = ['Admin', 'User'];
  default: string = this.roles[0];
  accountCreated = false;
  errorMsg? = "default";

  constructor(private fb: FormBuilder,
              private loginService: LoginService) {
    this.registerForm.controls['role'].setValue(this.default, {onlySelf: true});
  }

  ngOnInit(): void {
  }

  private passwordValidator(fieldA: string, fieldB: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const formGroup = control as FormGroup;
      const valueA = formGroup.get(fieldA)?.value;
      const valueB = formGroup.get(fieldB)?.value;

      if (valueA === valueB) {
        return null;
      } else {
        return {valuesDoNotMatch: true}
      }

    }
  }

  async register() {
    if (this.registerForm.valid) {
      const dto: UserDto = {
        username: this.registerForm.get("username")?.value,
        password: this.registerForm.get("passwordConfirm")?.value,
        role: this.registerForm.get("role")?.value
      }

      await this.loginService.register(dto)
        .then(response =>
          this.accountCreated = true
        )
        .catch(error => {
          this.accountCreated = false;
          this.errorMsg = error.response.data;
        });
    }
  }
}
