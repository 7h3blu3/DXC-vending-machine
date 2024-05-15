import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  productForm: FormGroup;
  editMode: boolean = false;
  selectedProductId: number | null = null;

  constructor(private productService: ProductService, private fb: FormBuilder) { 
    this.products$ = this.productService.products$;  // Initialize the observable
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0.01), Validators.pattern('^[0-9]*\\.?[0-9]+$')]], // Only numbers and decimals
      quantity: ['', [Validators.required, Validators.min(1), Validators.max(15), Validators.pattern('^[0-9]+$')]] // Only integers
    });
  }

  ngOnInit() {
    this.productService.getProducts();
  }

  onSubmit() {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      if (this.editMode && this.selectedProductId !== null) {
        this.productService.updateProduct({ ...product, id: this.selectedProductId });
      } else {
        this.productService.addProduct(product);
      }
      this.productForm.reset();
      this.editMode = false;
      this.selectedProductId = null;
    }
  }

  onEdit(product: Product) {
    this.editMode = true;
    this.selectedProductId = product.id;
    this.productForm.patchValue(product);
  }

  onDelete(productId: number) {
    this.productService.deleteProduct(productId);
  }

  onResetForm() {
    this.productForm.reset();
    this.editMode = false;
    this.selectedProductId = null;
  }
}
