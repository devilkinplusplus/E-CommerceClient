import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { ProductService } from '../../services/common/models/product.service';
import { EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from '../../dialogs/delete-dialog/delete-dialog.component';
import { async, firstValueFrom } from 'rxjs';
import { HttpClientService } from '../../services/common/http-client.service';
import { AlertifyService, MessagePosition, MessageType } from '../../services/admin/alertify.service';


declare var $: any;

@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  //*Directive-i çağırdığımız html elementini əldə etmək üçün ElementRef..
  //*Directive-ə məxsus html elementinə müdaxilə edə bilmək üçün Renderer2..
  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    public dialog: MatDialog,
    private alertify: AlertifyService
  ) {
    //! sehife render edilerken <i> elementini yaratmaq üçün
    const i = _renderer.createElement('i');
    i.setAttribute('class', 'fas fa-trash');
    i.setAttribute('style', 'cursor:pointer;');
    _renderer.appendChild(element.nativeElement, i); //! td elementine <i></i> tagini elave et
  }

  //*Gönderilen id-ni tut
  @Input() id: string;
  @Input() controller: string;
  @Output() callBack: EventEmitter<any> = new EventEmitter();

  @HostListener('click') //!metod bu directive-in çağırıldığı elementə click edilərkən tetiklensin
  async onClick() {

    this.openDialog(async () => {
      const td: HTMLTableCellElement = this.element.nativeElement;

      await this.httpClientService.delete({
        controller: this.controller
      }, this.id).subscribe((data) => {

        $(td.parentElement).fadeOut(1500, () => {
          this.callBack.emit(); //! silenden sonra avtomatik olaraq cedvelin guncellenmesi üçün
          this.alertify.message("Məlumat uğurla silindi", {
            messageType: MessageType.Success,
            dissmissOthers: true,
            position: MessagePosition.TopRight
          })
        });

      }, error => {
        this.alertify.message("Silmə zamanı gözlənməyən xəta baş verdi", {
          messageType: MessageType.Error,
          position: MessagePosition.TopRight,
          dissmissOthers: true
        })
      });

    })

  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: DeleteState,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result.Yes == DeleteState.Yes)
        afterClosed();
    });
  }


}
