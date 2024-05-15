import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Product } from '../../models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;
  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$: Observable<Product[]> = this.productsSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Fetch all products
  public getProducts(): void {
    this.http.get<Product[]>(this.apiUrl).pipe(
      retry(3), // Retry a failed request up to 3 times
      catchError(this.handleError),
      tap(products => this.productsSubject.next(products)) // Update the BehaviorSubject with the fetched products
    ).subscribe(); // Subscribe here to kick off the HTTP request
  }

  // Getter to access current products
  public get currentProducts(): Product[] {
    return this.productsSubject.getValue();
  }

  // Setter to update products(Will be used primarily for reset)
  public setProducts(products: Product[]): void {
    this.productsSubject.next(products);
  }

  // Add a new product
  addProduct(product: Product): void {
    this.http.post<Product>(this.apiUrl, product).pipe(
      catchError(this.handleError),
      tap(newProduct => {
        const currentProducts = this.productsSubject.getValue();
        this.productsSubject.next([...currentProducts, newProduct]); // Update the BehaviorSubject with the new product
      })
    ).subscribe();
  }

  // Update an existing product
  updateProduct(product: Product): void {
    this.http.put<Product>(`${this.apiUrl}/${product.id}`, product).pipe(
      catchError(this.handleError),
      tap(updatedProduct => {
        const currentProducts = this.productsSubject.getValue();
        const updatedProducts = currentProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p);
        this.productsSubject.next(updatedProducts); // Update the BehaviorSubject with the updated product list
      })
    ).subscribe();
  }

  // Delete a product
  deleteProduct(productId: number): void {
    this.http.delete(`${this.apiUrl}/${productId}`).pipe(
      catchError(this.handleError),
      tap(() => {
        const updatedProducts = this.productsSubject.getValue().filter(p => p.id !== productId);
        this.productsSubject.next(updatedProducts); // Update the BehaviorSubject with the new product list
      })
    ).subscribe();
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
