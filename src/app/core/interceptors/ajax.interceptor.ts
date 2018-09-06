import {Injectable, Injector} from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse,
  HttpErrorResponse, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpUserEvent, HttpHeaders
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, catchError, timeout } from 'rxjs/operators';
import { HTTP_SUCCESS_SERVER_CODE } from '../const';
import {environment} from 'environments/environment';
import { HTTP_TIMEOUT } from '../const';
import { UtilService } from '../services/util.service';

/**
 * http拦截器
 */
@Injectable()
export class AjaxInterceptor implements HttpInterceptor {
  private util: UtilService;
  constructor(
    private baseInjector: Injector
  ) {
    this.util = this.baseInjector.get(UtilService);
  }
  // 添加token
  private addAuthToken(req: HttpRequest<any>): HttpRequest<any> {
    let url = req.url;
    if (url.indexOf('?') > 0) {
      url += '&token=d0f9a9b2e8e82b66e6848859f9441dba';
    } else {
      url += '?token=d0f9a9b2e8e82b66e6848859f9441dba';
    }
    const secureReq = req.clone({url: url});
    return secureReq;
  }

  private goTo(url: string) {
    setTimeout(() => this.baseInjector.get(Router).navigateByUrl(url), 1500);
  }

  private toastError(msg: string) {
    this.util.toastError(msg);
  }
  // 检查http response status
  // private checkResponseStatus(resp: HttpResponse<any>): void {
  //   console.log('resp-----');
  //   console.log(resp);
  // }

  // intercept(req: HttpRequest<any>, next: HttpHandler):
  // Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
  //   const secureReq = this.addAuthToken(req);
  //   console.log(req);
  //   return next.handle(secureReq).pipe(
  //     mergeMap((event: any) => {
  //       if (event instanceof HttpResponse) { // 请求发送的时候也会执行这里面的方法，所以必须先判断 event 是否为HttpResponse的实例
  //         // observer.error 会跳转至后面的 `catch`
  //         if (event.status !== 200) {
  //           return Observable.create(observer => observer.error(event));
  //         }
  //         // 返回200正常，但业务错误
  //         const data = event.body;
  //         if (!data || data && data.code !== HTTP_SUCCESS_SERVER_CODE) {
  //           return Observable.create(observer => observer.error(event));
  //         }
  //       }
  //       return Observable.create(observer => observer.next(event));
  //     }),
  //     catchError((res: HttpResponse<any>) => {
  //       switch (res.status) {
  //         case 200:
  //           console.log('弹框提示业务错误=  ' + res.body.message);
  //           break;
  //         case 404:
  //           // todo 跳转404页面
  //           break;
  //       }
  //       return Observable.throw(res);
  //     })
  //   );
  // }

  private handleData(event: HttpResponse<any> | HttpErrorResponse): Observable<any> {
    switch (event.status) {
      case 200:
        if (event instanceof HttpResponse) {
          const data: any = event instanceof HttpResponse && event.body;
          if ((data && data.status && data.status.code !== HTTP_SUCCESS_SERVER_CODE)) { // 业务错误处理
            this.util.toastError(data.status.message)
            return Observable.create(observer => observer.error(event));
          }
        }
        break;
      case 401:
        // TODO go to login
        this.toastError('登录口令失效，请先登录~');
        this.goTo('/auth/login');
        break;
      case 403:
      case 404:
      case 500:
        this.toastError('网络错误');
        break;
      default:
        if (event instanceof HttpErrorResponse) {
          console.warn(
            '未可知错误，大部分是由于后端不支持CORS或无效配置引起',
            event,
          );
          // this.util.toastError(event.message);
          this.toastError('服务器错误');
        }
        break;
    }
    return of(event);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
  Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    let url = req.url;
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      url = environment.SERVER_URL + url;
    }
    let headers = req.headers
    // headers = headers.set('token', '4.1.f5c58398e4ba30d395ae6ef6b0be4952');
    // let headers = new HttpHeaders({'token': '4.1.cf312f31fdf0eb76499086af981f9ef2'});
    const secureReq = req.clone({url: url, headers: headers });
    return next.handle(secureReq).pipe(
      timeout(HTTP_TIMEOUT),
      mergeMap((event: any) => {
        if (event instanceof HttpResponse && event.status === 200) { // 请求发送的时候也会执行这里面的方法，所以必须先判断 event 是否为HttpResponse的实例
          return this.handleData(event);
        }
        return of(event);
      }),
      // FIXME handle error
      catchError((err: HttpErrorResponse) => {
        if (err.status !== 200) {
          return this.handleData(err);
        }
      })
    );
  }
}
