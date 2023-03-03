import { Component } from '@angular/core';
import { CategoryService } from '../../../../services/common/models/category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from '../../../../base/base.component';
import { MessagePosition } from '../../../../services/admin/alertify.service';
import {
  AlertifyService,
  MessageType,
} from '../../../../services/admin/alertify.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss'],
})
export class CategoryCreateComponent extends BaseComponent {
  constructor(
    private categoryService: CategoryService,
    private alertifyService: AlertifyService,
    spinner: NgxSpinnerService
  ) {
    super(spinner);
  }

}
