import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(
    private httpClient: HttpClient,
    @Inject('baseUrl') private baseUrl: string
  ) {}

  private _options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  //* İstifadə edilən url-i yoxlamaq üçündür, fərqli url istifadə edilmədiyi təqdirdə bizim appModule-dakı baseUrl-i istifadə edir
  private url(requestParameter: Partial<RequestParameters>): string {
    return `
    ${requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl}/${
      requestParameter.controller
    }${requestParameter.action ? `/${requestParameter.action}` : ''}
    `;
  }

  get<T>(
    requestParameter: Partial<RequestParameters>,
    id?: string
  ): Observable<T> {
    let url: string = '';

    if (requestParameter.fullEndPoint) {
      url = requestParameter.fullEndPoint;
    } else {
       //* Get istəyinin id və queryString alıb-almamasını yoxla və url-i müəyyən et

      url = `${this.url(requestParameter)}${id ? `/${id}` : ''}${requestParameter.queryString ? `?${requestParameter.queryString}`: ''}`.replace(/\s/g, "");
    }
    return this.httpClient.get<T>(url, { headers: requestParameter.headers });
  }

  post<T>(
    requestParameter: Partial<RequestParameters>,
    body: Partial<T>
  ): Observable<T> {
    let url: string = '';

    if (requestParameter.fullEndPoint) {
      url = requestParameter.fullEndPoint;
    } else {
      url = `${this.url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}`: ''}`.replace(/\s/g, "");
    }

    return this.httpClient.post<T>(url, body, {
      headers: requestParameter.headers,
    });
  }

  put<T>(
    requestParameter: Partial<RequestParameters>,
    body: Partial<T>
  ): Observable<T> {
    let url: string = '';

    if (requestParameter.fullEndPoint) {
      url = requestParameter.fullEndPoint;
    } else {
      url = `${this.url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}`: ''}`.replace(/\s/g, "");
    }

    return this.httpClient.put<T>(url, body, {
      headers: requestParameter.headers,
    });
  }

  delete<T>(
    requestParameter: Partial<RequestParameters>,
    id: string
  ): Observable<T> {
    let url: string = '';

    if (requestParameter.fullEndPoint) {
      url = requestParameter.fullEndPoint;
    } else {
      url = `${this.url(requestParameter)}/${id}${requestParameter.queryString ? `?${requestParameter.queryString}`: ''}`.replace(/\s/g, "");
    }

    return this.httpClient.delete<T>(url, {
      headers: requestParameter.headers,
    });
  }
}

export class RequestParameters {
  controller?: string;
  action?: string;
  headers?: HttpHeaders;
  queryString?: string;

  baseUrl?: string; //* Fərqli baseUrl istifadə edilərsə, lazım ola bilər
  fullEndPoint?: string; //* Tamam fərqli bir endpointə istək göndərilərsə deyə
  responseType?: string = 'json';
}
