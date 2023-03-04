import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { AlertifyService, MessagePosition, MessageType } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(private httpClientService: HttpClientService, private alertify: AlertifyService,
          private toastr: CustomToastrService) { }

  @Input() options: Partial<FileUploadOptions>;

  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      //filelarla çalışa bilmek üçün onları başqa bir fayl formatına çevirmək lazımdır
      const fileEntry = file.fileEntry as FileSystemFileEntry;
      fileEntry.file((_file) => {
        //_file gerçək faylı qaytarır
        //her bir faylı fileData dizisinə əlavə etdim
        fileData.append(_file.name, _file, file.relativePath);
      })
    }
    this.httpClientService.post({
      controller: this.options.controller,
      action: this.options.action,
      queryString: this.options.queryString,
      headers: new HttpHeaders({ 'responseType': 'blob' })
    }, fileData).subscribe((data) => {
      //uğurlu istək
      if (this.options.isAdminPage) {
        this.alertify.message("Fayllar uğurla yükləndi", {
          dissmissOthers: true,
          position: MessagePosition.TopRight,
          messageType: MessageType.Notify
        })

      } else {
        this.toastr.message("Fayllar uğurla yükləndi", "Məlumat", {
          messageType: ToastrMessageType.Info,
          position: ToastrMessagePosition.TopRight
        })
      }


    }, (error: HttpErrorResponse) => {
      //uğursuz istək
      if (this.options.isAdminPage) {
        
        this.alertify.message("Fayllar yüklənərkən xəta baş verdi", {
          dissmissOthers: true,
          position: MessagePosition.TopRight,
          messageType: MessageType.Error
        })

      } else {
        this.toastr.message("Fayllar yüklənərkən xəta baş verdi", "Xəta", {
          messageType: ToastrMessageType.Error,
          position: ToastrMessagePosition.TopRight
        })
      }

    });
  }

}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false; // notificationu admin ve ui sehifesine görə fərqli istifadə edəcəyimizdən..
}
