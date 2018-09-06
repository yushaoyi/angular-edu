import { environment} from '@env/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import {Injector} from '@angular/core';
import { catchError, tap } from 'rxjs/operators';

/**
 * http请求基础类
 */
export abstract class BaseRestService {
  protected baseUrl: string = environment.SERVER_URL;
  protected http: HttpClient;
  constructor(
    private baseInjector: Injector) {
    this.http = this.baseInjector.get(HttpClient);
  }

  parseGetParams(url: string, obj?: object): string {
    let i = 0;
    let hasParam = false;
    if (url.indexOf('?') !== -1) {
      hasParam = true;
    }
    for (let key in obj) {
      if (obj[key] === null || typeof obj[key] === 'undefined') {
        continue;
      }
      if (i === 0 && !hasParam) {
        hasParam = true
        url += '?' + encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
      } else {
        url += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
      }
    }
    return url;
  }

  checkHandleError = (err: HttpErrorResponse, observer) => {
    console.log(err);
    if (err instanceof Error && err.name == 'TimeoutError') {
      console.log('请求超时');
      observer.error({});
    } else {
      let errObj = {};
      if (err instanceof HttpResponse) {
        errObj = err.body;
      } else {
        errObj = err.error;
      }
      observer.error(errObj);
    }
    observer.complete();
  }


  getServer(
    url: string,
    params?: any,
    options?: {
      headers?: HttpHeaders | { [header: string]: string | string[] };
      observe?: 'body' | 'events' | 'response';
      reportProgress?: boolean,
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      withCredentials?: boolean;
    }): Observable<any> {
    return this.request(
      'GET',
      url,
      Object.assign(
        {
          params,
        },
        options,
      )
    );
  }

  postServer(
    url: string,
    params?: any,
    body?: any,
    options?: {
      headers?: HttpHeaders | { [header: string]: string | string[] }
      observe?: 'body' | 'events' | 'response';
      reportProgress?: boolean;
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      withCredentials?: boolean;
    }
  ): Observable<any> {
    // options = options || {}
    // options.headers = options.headers || { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
    return this.request(
      'POST',
      url,
      Object.assign(
        {
          body: Object.assign(params || {}, body),
        },
        options,
      )
    );



    // console.log(params)
    // url = this.baseUrl + url;
    // return Observable.create(observer => {
    //   this.http.post(url, params)
    //   // this.http.request(url, options)
    //     .pipe(
    //       tap(() => {
    //         //
    //       }),
    //       catchError(res => {
    //         return throwError(res);
    //       })
    //     )
    //     .subscribe(
    //       data => {
    //         observer.next(data.data);
    //         observer.complete();
    //       },
    //       (err: HttpErrorResponse) => {
    //         this.checkHandleError(err, observer);
    //       },
    //       () => {
    //         observer.complete();
    //       }
    //     );
    // });
  }

  putServer(
    url: string,
    params?: any,
    body?: any,
    options?: {
      headers?: HttpHeaders | { [header: string]: string | string[] }
      observe?: 'body' | 'events' | 'response';
      reportProgress?: boolean;
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      withCredentials?: boolean;
    }): Observable<any> {
    return this.request(
      'PUT',
      url,
      Object.assign(
        {
          body: Object.assign(params || {}, body),
        },
        options,
      )
    );
  }

  deleteServer(
    url: string,
    params?: any,
    options?: {
      headers?: HttpHeaders | { [header: string]: string | string[] };
      observe?: 'body' | 'events' | 'response';
      reportProgress?: boolean;
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      withCredentials?: boolean;
    },
  ): Observable<any> {
    return this.request(
      'DELETE',
      url,
      Object.assign(
        {
          params
,        },
        options,
      )
    );
  }

  parseParams(params: any): HttpParams {
    let paramsObj = new HttpParams();
    Object.keys(params).forEach(key => {
      let _data = params[key];
      paramsObj = paramsObj.set(key, _data);
    });
    return paramsObj;
  }

  /**
   * `request` 请求
   *
   * @param method 请求方法类型
   * @param url URL地址
   * @param options 参数
   */
  request<R> (
    method: string,
    url: string,
    options?: {
      body?: any;
      headers?:
        | HttpHeaders
        | {
        [header: string]: string | string[];
      };
      observe?: 'body' | 'events' | 'response';
      params?:
        | HttpParams
        | {
        [param: string]: string | string[];
      };
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      reportProgress?: boolean;
      withCredentials?: boolean;
    },
  ): Observable<R>;

  request (
    method: string,
    url: string,
    options?: {
      body?: any,
      headers?:
        | HttpHeaders
        | {
            [ header: string]: string | string[];
          };
      observe?: 'body' | 'events' | 'response',
      params?:
        | HttpParams
        | {
            [ params: string]: string | string[];
          };
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      reportProgress?: boolean;
      withCredentials?: boolean;
    },
  ): Observable<any> {
    if (options && options.params) {
      options.params = this.parseParams(options.params);
    }
    options = options || {}
    options.withCredentials = true
    url = this.baseUrl + url;
    return Observable.create(observer => {
      this.http.request(method, url, options)
      // this.http[method](url, options)
        .pipe(
          tap(() => {
            //
          }),
          catchError(res => {
            return throwError(res);
          })
        )
        .subscribe(
        data => {
          observer.next(data.data);
          observer.complete();
        },
        (err: HttpErrorResponse) => {
          this.checkHandleError(err, observer);
        },
        () => {
          observer.complete();
        }
      );
    });
  }
}
