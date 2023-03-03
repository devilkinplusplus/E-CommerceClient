import { Component } from '@angular/core';
import { BaseComponent } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from 'src/app/services/common/models/product.service';
import { CreateProduct } from '../../../../contracts/create_product';
import {
  AlertifyService,
  MessagePosition,
  MessageType,
} from '../../../../services/admin/alertify.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent extends BaseComponent {
  constructor(
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertify: AlertifyService
  ) {
    super(spinner);
  }

  create(
    title: HTMLInputElement,
    desc: HTMLTextAreaElement,
    price: HTMLInputElement,
    stock: HTMLInputElement
  ) {
    this.showSpinner();
    const createProduct: CreateProduct = new CreateProduct();
    createProduct.title = title.value;
    createProduct.description = desc.value;
    createProduct.price = parseFloat(price.value);
    createProduct.stock = parseInt(stock.value);

    this.productService.createProduct(createProduct, () => {
      this.hideSpinner();
      this.alertify.message('Successfully created', {
        messageType: MessageType.Success,
        dissmissOthers: true,
        position: MessagePosition.TopRight,
      });
    });
  }
}
