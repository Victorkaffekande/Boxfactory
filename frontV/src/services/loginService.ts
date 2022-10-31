import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {UserDto} from "../interfaces/userDto";
import {Observable} from "rxjs";
import * as http from "http";
import {Injectable} from "@angular/core";
import axios from "axios";
import {customAxios} from "./httpAxios";



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() {
  }

  async login(userDto: UserDto): Promise<any> {
    console.log(userDto)
    const httpResult = await customAxios.post('Auth/login',userDto);
    return httpResult.data;
  }

}
