import {Injectable} from '@angular/core';
import {Box} from "./boxes/box";
import {BOXES} from "./mock-boxes";
import {catchError, map, tap, Observable, of, pipe} from "rxjs";
import {MessageService} from "./message.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {BoxDto} from "./boxes/boxDto";

@Injectable({
  providedIn: 'root'
})
export class BoxService {
  private boxUrl = 'https://localhost:7046';

  constructor(private messageService: MessageService,
              private http: HttpClient) {
  }

  getBoxes(): Observable<Box[]> {
    return this.http.get<Box[]>(this.boxUrl + "/Box/Boxes")
      .pipe(
        catchError(this.handleError<Box[]>('getBoxes', []))
      );
  }

  getBox(id: number): Observable<Box> {
    const url = `${this.boxUrl + "/Box/GetBoxById"}/${id}`;
    return this.http.get<Box>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Box>(`getHero id=${id}`))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  updateBox(box: Box): Observable<any> {
    const url = `${this.boxUrl + "/Box/UpdateBox"}/${box.id}`;
    /** PUT: update the hero on the server */
    return this.http.put(url, box, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${box.id}`)),
      catchError(this.handleError<any>('updateBox'))
    );
  }

  addBox(boxDto: BoxDto):Observable<Box> {
    const url =this.boxUrl + "/Box/CreateBox/";
    return this.http.post<Box>(url,boxDto,this.httpOptions).pipe(
      tap((newBox: Box) => this.log(`added box w/ id=${newBox.id}`)),
      catchError(this.handleError<Box>('addBox'))
    );
  }

  deleteBox(id: number):Observable<Box> {
    const url = `${this.boxUrl + "/Box/DeleteBox"}/${id}`
    return this.http.delete<Box>(url,this.httpOptions).pipe(
      tap(_=>this.log(`deleted heo id=${id}`)),
      catchError(this.handleError<Box>('deleteBox'))
    );
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
