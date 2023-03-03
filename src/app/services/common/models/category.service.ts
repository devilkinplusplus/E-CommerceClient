import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Category } from 'src/app/contracts/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClientService) {}

  create(category: Category, successCallBack?: any) {
    this.httpClient
      .post(
        {
          controller: 'categories',
          action: 'post',
        },
        category
      )
      .subscribe(() => {
         successCallBack();
      });
  }

}
