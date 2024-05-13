import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../../models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Adding error handling for issues with network or backend(Imagining its not just a mocked API)
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error has occurred.';
    if (error.error instanceof ErrorEvent) {
      // client side or network error
      errorMessage = `A network error occurred: ${error.error.message}`;
    } else {
      // backend returned an unsuccessful response code
      errorMessage = `Server returned code ${error.status}, message was: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
