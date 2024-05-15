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

  purchaseSelectedProduct(): boolean {
    if (this.selectedProduct) {
      const totalInserted = this.insertedAmountSubject.getValue();
      if (totalInserted >= this.selectedProduct.price) {
        const change = totalInserted - this.selectedProduct.price;
        this.insertedAmountSubject.next(0); // Clear inserted amount
        this.selectedProduct.quantity -= 1;
        this.productService.updateProduct(this.selectedProduct);
        this.totalAmountSubject.next(this.totalAmountSubject.getValue() + change); // Add change back to total amount
        alert('Purchase successful. Your change: ' + change.toFixed(2) + ' BGN');
        this.selectedProduct = null; // Clear the selected product after successful purchase
        return true; // Indicate successful purchase
      } else {
        const amountNeeded = this.selectedProduct.price - totalInserted;
        alert('Insufficient funds. Please insert ' + amountNeeded.toFixed(2) + ' more BGN.');
        return false; // Indicate unsuccessful purchase
      }
    } else {
      alert('No product selected.');
      return false; // Indicate unsuccessful purchase
    }
  }
  
  reset() {
    const insertedAmount = this.insertedAmountSubject.getValue();
    this.totalAmountSubject.next(this.totalAmountSubject.getValue() + insertedAmount); // Return inserted amount
    this.insertedAmountSubject.next(0); // Reset inserted amount to 0
    this.selectedProduct = null; // Clear the selected product
  }
}
