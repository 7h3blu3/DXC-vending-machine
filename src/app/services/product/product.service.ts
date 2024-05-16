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
    ).subscribe(); // Subscribe to kick off the HTTP request
  }

  // Getter to access current products
  public get currentProducts(): Product[] {
    return this.productsSubject.getValue();
  }

  // Setter to update products(Will be used primarily for reset)
  public setProducts(products: Product[]): void {
    this.productsSubject.next(products);
  }

  // Add a new product in-memory
  addProduct(product: Product): void {
    const currentProducts = this.productsSubject.getValue();
    this.productsSubject.next([...currentProducts, product]);
  }

  // Update an existing product in-memory
  updateProduct(product: Product): void {
    const currentProducts = this.productsSubject.getValue();
    const updatedProducts = currentProducts.map(p => p.id === product.id ? product : p);
    this.productsSubject.next(updatedProducts);
  }

  // Delete a product in-memory
  deleteProduct(productId: number): void {
    const currentProducts = this.productsSubject.getValue();
    const updatedProducts = currentProducts.filter(p => p.id !== productId);
    this.productsSubject.next(updatedProducts);
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
