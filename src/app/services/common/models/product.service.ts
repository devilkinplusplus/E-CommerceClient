import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from '../../../contracts/create_product';
import { firstValueFrom } from 'rxjs';
import { ListProduct } from '../../../contracts/list_product';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

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

  createProduct(
    product: CreateProduct,
    successCallback?: any,
    errorCallback?: (errorMessage: string) => void
  ) {
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
      .subscribe(
        (res) => {
          successCallback();
        },
        (errorResponse: HttpErrorResponse) => {
          const _error: Array<{ key: string; value: Array<string> }> =
            errorResponse.error;
          let message = '';
          _error.forEach((v, index) => {
            v.value.forEach((_v, _i) => {
              message += `${_v}<br>`;
            });
            errorCallback(message);
          });
        }
      );
  }

  async read(
    page: number = 0, //! ilk sehife açılanda 0-cı sehifede ol ve 5 dataı getir
    size: number = 5,
    successCallback?: () => void,
    errorCallback?: (errorMessage: string) => void
  ): Promise<{ totalCount: number; products: ListProduct[] }> {
    const products: Promise<{ totalCount: number; products: ListProduct[] }> =
      firstValueFrom<{ totalCount: number; products: ListProduct[] }>(
        this.httpClient.get<{ totalCount: number; products: ListProduct[] }>({
          controller: 'products',
          queryString: `page=${page}&size=${size}`,
        })
      );

    products
      .then((x) => successCallback())
      .catch((errorRes: HttpErrorResponse) => {
        errorCallback(errorRes.message);
      });

    return await products;
  }
}
