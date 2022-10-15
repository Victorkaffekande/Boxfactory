import { Injectable } from '@angular/core';
import axios from 'axios';
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError} from "rxjs";

export const customAxios = axios.create({
  baseURL : 'https://localhost:7046/box'
})

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private matSnackbar : MatSnackBar){
    customAxios.interceptors.response.use(
      response => {
      if (response.status==201){
        this.matSnackbar.open("Great success")._dismissAfter(1000)
      }
      return response;
      }, rejected => {
        if (rejected.response.status>= 400 && rejected.response.status<500){
          matSnackbar.open(rejected.response.data)._dismissAfter(1000)
        }else if (rejected.response.status> 499){
          this.matSnackbar.open("Something went wrong")
        }
        catchError(rejected);
      }
      )
  }



  async getBoxes() {
    const httpResponse = await customAxios.get<any>('Boxes');
    return httpResponse.data;
  }

  async createBox(dto: { depth: number; color: string; thickness: number; name: string; width: number; height: number }) {
    const httpResult = await customAxios.post('CreateBox', dto)
    return httpResult.data;
  }

  async deleteBox(id: any) {
    const httpResult = await customAxios.delete('DeleteBox/' +id)
    return httpResult.data;
  }

  async editBox(dto: { depth: number; color: string; thickness: number; name: string; width: number; id: number; height: number }) {
    const httpResult = await customAxios.put('UpdateBox/'+dto.id , dto)
    return httpResult.data;
  }
}
