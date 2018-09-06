import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import {BaseRestService} from '../../core';


enum LayoutApiUrls {
  logout = '/api/admin/signout'
}

@Injectable()
export class LayoutService extends BaseRestService {
  constructor(
    private injector: Injector
  ) {
    super(injector);
  }

  // 退出登录
  public logout (params?: any): Observable<any> {
    return this.postServer(LayoutApiUrls.logout, params);
  }
}
