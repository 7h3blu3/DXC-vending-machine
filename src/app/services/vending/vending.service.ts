import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductService } from '../product/product.service';

@Injectable({
  providedIn: 'root'
})
export class VendingService {
  private selectedProduct: Product | null = null;
  private insertedAmountSubject = new BehaviorSubject<number>(0);
  public insertedAmount$ = this.insertedAmountSubject.asObservable();
  private totalAmountSubject = new BehaviorSubject<number>(100);  // Start with 100 BGN
  public totalAmount$ = this.totalAmountSubject.asObservable();

  constructor(private productService: ProductService) {}

  get products$() {
    return this.productService.products$;
  }

  loadInitialProducts() {
    this.productService.getProducts();
  }

  selectProduct(product: Product) {
    if (product.quantity > 0) {
      this.selectedProduct = product;
    } else {
      alert('Selected product is out of stock.');
    }
  }

  insertCoin(amount: number) {
    const totalAmount = this.totalAmountSubject.getValue();
    if (totalAmount >= amount) {
      this.totalAmountSubject.next(totalAmount - amount);
      const insertedAmount = this.insertedAmountSubject.getValue();
      this.insertedAmountSubject.next(insertedAmount + amount);
    } else {
      alert('Not enough money available.');
    }
  }

  purchaseSelectedProduct() {
    if (this.selectedProduct) {
      const totalInserted = this.insertedAmountSubject.getValue();
      if (totalInserted >= this.selectedProduct.price) {
        const change = totalInserted - this.selectedProduct.price;
        this.insertedAmountSubject.next(0); // Clear inserted amount
        this.selectedProduct.quantity -= 1;
        this.productService.updateProduct(this.selectedProduct);
        this.selectedProduct = null;
        this.totalAmountSubject.next(this.totalAmountSubject.getValue() + change); // Add change back to total amount
        alert('Purchase successful. Your change: ' + change.toFixed(2) + ' BGN');
      } else {
        alert('Insufficient funds. Please insert more coins.');
      }
    } else {
      alert('No product selected.');
    }
  }

  reset() {
    const insertedAmount = this.insertedAmountSubject.getValue();
    this.totalAmountSubject.next(this.totalAmountSubject.getValue() + insertedAmount);
    this.insertedAmountSubject.next(0);
    this.selectedProduct = null;
  }
}
