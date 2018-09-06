import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import {BaseRestService} from '../../core';

enum AuthApiUrls {
  login = '/api/admin/login',
  logout = '/api/admin/signout'
}

@Injectable()
export class AuthService extends BaseRestService {
  constructor(
    private injector: Injector
  ) {
    super(injector);
  }

  // 登录
  public login (params?: any): Observable<any> {
    return this.postServer(AuthApiUrls.login, params);
  }

  // 退出登录
  public logout (params?: any): Observable<any> {
    return this.postServer(AuthApiUrls.logout, params);
  }
}
