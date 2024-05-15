import { Component, OnInit } from '@angular/core';
import { VendingService } from '../../services/vending/vending.service';
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-interaction',
  templateUrl: './product-interaction.component.html',
  styleUrls: ['./product-interaction.component.css']
})
export class ProductInteractionComponent implements OnInit {
  products$: Observable<Product[]>;
  insertedAmount$: Observable<number>;
  totalAmount$: Observable<number>;
  selectedProduct: Product | null = null;

  constructor(private vendingService: VendingService) {
    this.products$ = this.vendingService.products$;
    this.insertedAmount$ = this.vendingService.insertedAmount$;
    this.totalAmount$ = this.vendingService.totalAmount$;
  }

  ngOnInit() {}

  onSelectProduct(product: Product) {
    this.vendingService.selectProduct(product);
    this.selectedProduct = product;
  }

  insertCoin(amount: number) {
    this.vendingService.insertCoin(amount);
  }

  onPurchase() {
    this.vendingService.purchaseSelectedProduct();
  }

  reset() {
    this.vendingService.reset();
  }
}
