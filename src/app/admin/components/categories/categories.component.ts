import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from '../../../base/base.component';
import { HttpClientService } from '../../../services/common/http-client.service';
import { Category } from '../../../contracts/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private httpClient: HttpClientService
  ) {
    super(spinner);
  }

  ngOnInit(): void {
    // this.httpClient
    //   .get<Category[]>({
    //     controller: 'categories',
    //     action: 'get',
    //   })
    //   .subscribe((data) => console.log(data));

    // this.httpClient
    //   .post(
    //     {
    //       controller: 'categories',
    //       action: 'post',
    //     },
    //     {
    //       name: 'Tv',
    //     }
    //   )
    //   .subscribe();

   
  }
}
