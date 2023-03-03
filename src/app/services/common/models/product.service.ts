import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from '../../../contracts/create_product';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private httpClient: HttpClientService,
    private http: HttpClient
  ) {}

  private _options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  createProduct(product: CreateProduct, successCallback?: any) {
    // this.httpClient
    //   .post(
    //     {
    //       controller: 'products',
    //     },
    //     {
    //       product,
    //     }
    //   )
    //   .subscribe((res) => {
    //     successCallback();
    //   });
    
    this.http
      .post('https://localhost:7162/api/products', product, this._options)
      .subscribe((res) => {
        successCallback();
      });
  }
}
