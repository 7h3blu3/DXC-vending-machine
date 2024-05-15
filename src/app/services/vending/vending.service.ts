import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class VendingService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$ = this.productsSubject.asObservable();
  private selectedProduct: Product | null = null;
  private insertedAmountSubject = new BehaviorSubject<number>(0);
  public insertedAmount$ = this.insertedAmountSubject.asObservable();
  private totalAmountSubject = new BehaviorSubject<number>(100);  // Start with 100 BGN
  public totalAmount$ = this.totalAmountSubject.asObservable();

  constructor() {
    this.loadInitialProducts();
  }

  loadInitialProducts() {
    const products: Product[] = [
      { id: 1, name: 'Coca Cola', price: 1.25, quantity: 15 },
      { id: 2, name: 'Pepsi', price: 1.15, quantity: 15 },
      { id: 3, name: 'Water', price: 1.00, quantity: 15 },
      { id: 4, name: 'Sprite', price: 1.20, quantity: 15 },
      { id: 5, name: 'Fanta', price: 1.30, quantity: 15 },
      { id: 6, name: 'Diet Coke', price: 1.25, quantity: 15 },
      { id: 7, name: 'Snack Bar', price: 0.85, quantity: 15 },
      { id: 8, name: 'Chips', price: 0.90, quantity: 15 },
      { id: 9, name: 'Chocolate', price: 1.50, quantity: 15 }
    ];
    this.productsSubject.next(products);
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
        this.productsSubject.next(this.productsSubject.getValue());
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
