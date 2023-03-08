import { Component, Inject, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from '../../services/common/models/product.service';
import { ProductImages } from 'src/app/contracts/productImages';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  AlertifyService,
  MessagePosition,
  MessageType,
} from '../../services/admin/alertify.service';

declare var $: any;

@Component({
  selector: 'app-select-prod-img-dialog',
  templateUrl: './select-prod-img-dialog.component.html',
  styleUrls: ['./select-prod-img-dialog.component.scss'],
})
export class SelectProdImgDialogComponent extends BaseDialog<SelectProdImgDialogComponent> {
  constructor(
    dialogRef: MatDialogRef<SelectProdImgDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService
  ) {
    super(dialogRef);
  }

  images: ProductImages[];

  async ngOnInit() {
    this.images = await this.productService.readImages(
      this.data as string,
      () => {
        this.spinner.hide();
      }
    );
  }

  async deleteImage(imageId: string, event: any) {
    await this.productService.deleteImage(this.data as string, imageId, () => {
      this.alertify.message('Fayl uğurla silindi', {
        dissmissOthers: true,
        messageType: MessageType.Warning,
        position: MessagePosition.BottomRight,
      });
      var card = $(event.srcElement).parent().parent().parent().parent();
      card.fadeOut(500);
    });
  }

  @Output() options: Partial<FileUploadOptions> = {
    accept: '.png, .jpg, .jpeg',
    controller: 'products',
    action: 'upload',
    explanation: 'Məhsul üçün təsvirləri seçin',
    isAdminPage: true,
    queryString: `id=${this.data}`,
  };
}

export enum SelectProductImageState {
  Close,
}
