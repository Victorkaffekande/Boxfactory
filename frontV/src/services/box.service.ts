import {Injectable} from '@angular/core';
import {Box} from "../interfaces/box";

import {catchError, map, tap, Observable, of, pipe} from "rxjs";
import {MessageService} from "./message.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {BoxDto} from "../interfaces/boxDto";
import {customAxios} from "./httpAxios";


@Injectable({
  providedIn: 'root'
})
export class BoxService {
  private boxUrl = 'https://localhost:7046/Box/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    })
  };

  constructor(private messageService: MessageService,
              private http: HttpClient) {

  }

///TODO REFACTOR ALT HTTP CLIENT TIL ASYNC CUSTOM AXIOS FORDI HVORFOR SKULLE VI DOG BLIVE UNDER VIST PÅ EN MÅDE DER GAV MENING KILL ME
  async getBoxes(): Promise<Box[]> {
    let response = await customAxios.get<Box[]>('Box/Boxes');
    return response.data;

  }

  async getBox(id: number): Promise<Box> {
   let response = await customAxios.get<Box>("GetBoxById/"+id);
   return response.data;
  }

  async updateBox(box: Box) {
    let response = await customAxios.put<any>("Box/UpdateBox/"+box.id,box);
    return response.data;
  }

  async addBox(boxDto: BoxDto): Promise<Box> {
    let response = await customAxios.post("Box/CreateBox",boxDto)
    return response.data;
  }

  async deleteBox(id: number): Promise<any> {
    let response = await customAxios.delete<Box>("Box/DeleteBox/"+id)
    return response.data;

  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`BoxService: ${message}`);
  }


}
