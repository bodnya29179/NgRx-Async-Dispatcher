import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

@Injectable()
export class DataService {
  getData(): Observable<number[]> {
    /* Simulate the HTTP-request */
    return of([1, 2, 3, 4, 5]);

    /* Simulate the HTTP-request with error */
    // return throwError(() => {
    //   return new HttpErrorResponse({
    //     error: 'http error message',
    //     status: 500,
    //   });
    // });
  }
}
