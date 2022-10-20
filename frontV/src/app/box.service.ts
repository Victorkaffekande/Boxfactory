import {Injectable} from '@angular/core';
import {Box} from "./boxes/box";
import {BOXES} from "./mock-boxes";
import {catchError,map,tap, Observable, of} from "rxjs";
import {MessageService} from "./message.service";
import {HttpClient} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class BoxService {
  private boxUrl = 'https://localhost:7046';

  constructor(private messageService: MessageService,
              private http: HttpClient) {
  }

  getBoxes(): Observable<Box[]> {

    return this.http.get<Box[]>(this.boxUrl+"/Box/Boxes")
      .pipe(
        catchError(this.handleError<Box[]>('getBoxes',[]))
      );
  }

  getBox(id: number): Observable<Box> {
    //TODO SINGLE GETTER BOX
    const url = `${this.boxUrl}/${id}`;
    return this.http.get<Box>(this.boxUrl).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Box>(`getHero id=${id}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T){
    return(error:any):Observable<T> =>{
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
