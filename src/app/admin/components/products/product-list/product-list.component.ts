import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ListProduct } from '../../../../contracts/list_product';
import { ProductService } from '../../../../services/common/models/product.service';
import { BaseComponent } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  AlertifyService,
  MessagePosition,
  MessageType,
} from '../../../../services/admin/alertify.service';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from '../../../../services/common/dialog.service';
import { SelectProdImgDialogComponent } from 'src/app/dialogs/select-prod-img-dialog/select-prod-img-dialog.component';

declare var $: any; //! for using jquery

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent extends BaseComponent implements OnInit {
  constructor(
    private productService: ProductService,
    spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private dialogService: DialogService
  ) {
    super(spinner);
  }

  displayedColumns: string[] = [
    'title',
    'stock',
    'price',
    'date',
    'image',
    'edit',
    'delete',
  ];
  dataSource: MatTableDataSource<ListProduct> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getProducts() {
    this.showSpinner();

    const productList: { totalCount: number; products: ListProduct[] } =
      await this.productService.read(
        this.paginator ? this.paginator.pageIndex : 0,
        this.paginator ? this.paginator.pageSize : 5,
        () => this.hideSpinner(),
        (errorMessage) =>
          this.alertify.message('Gözlənməyən xəta baş verdi', {
            dissmissOthers: true,
            messageType: MessageType.Error,
            position: MessagePosition.TopRight,
          })
      );

    this.dataSource = new MatTableDataSource<ListProduct>(productList.products);
    this.paginator.length = productList.totalCount;
  }

  async ngOnInit() {
    await this.getProducts();
  }

  async onPageChange() {
    await this.getProducts();
  }

  onAddProductImage(id: string) {
    this.dialogService.openDialog({
      componentType: SelectProdImgDialogComponent,
      data: id,
      options: {
        width: '1000px',
      },
    });
  }
}
