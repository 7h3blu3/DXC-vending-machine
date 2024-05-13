import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Product } from '../../models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) { }

  // Fetch all products
  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      retry(3), // Retry failed request for products fetching up to 3 times
      catchError(this.handleError)
    );
  }

    // Fetch a single product by ID
    public getProductById(productId: number): Observable<Product> {
      return this.http.get<Product>(`${this.apiUrl}/${productId}`).pipe(
        catchError(this.handleError)
      );
    }
  
    // Add a new product
    public addProduct(product: Product): Observable<Product> {
      return this.http.post<Product>(this.apiUrl, product).pipe(
        catchError(this.handleError)
      );
    }
  
    // Update an existing product
    public updateProduct(product: Product): Observable<Product> {
      return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product).pipe(
        catchError(this.handleError)
      );
    }
  
    // Delete a product
    public deleteProduct(productId: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${productId}`).pipe(
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
