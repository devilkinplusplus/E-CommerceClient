import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductListComponent } from './product-list/product-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeleteDirective } from '../../../directives/admin/delete.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../dialogs/delete-dialog/delete-dialog.component';
import { FileUploadModule } from '../../../services/common/file-upload/file-upload.module';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductCreateComponent,
    ProductListComponent,
    DeleteDialogComponent,
    DeleteDirective,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule.forChild([{ path: '', component: ProductsComponent }]),
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    FileUploadModule
  ],
})
export class ProductsModule {}
