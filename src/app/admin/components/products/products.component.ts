import { Component, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CreateProduct } from '../../../contracts/create_product';
import { ProductListComponent } from './product-list/product-list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends BaseComponent {
  constructor(spinner: NgxSpinnerService) {
    super(spinner);
  }

  @ViewChild(ProductListComponent) prodListComponent: ProductListComponent;

  newProduct(product: CreateProduct) {
    this.prodListComponent.getProducts();
  }
}
