import { Injectable } from '@angular/core';
import { User } from './interface';
import {Observable, BehaviorSubject, Observer} from 'rxjs';
import { share } from 'rxjs/operators';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import {d, v} from '@angular/core/src/render3';
import { TOAST_DURATION } from '../const';

const USER_KEY = 'user';

@Injectable()
export class UtilService {
  private _user: User = null;
  private change$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(
    private modal: NzModalService,
    private message: NzMessageService
  ) {

  }

  private get(key: string) {
    return JSON.parse(sessionStorage.getItem(key) || 'null') || null;
  }

  private set(key: string, value: User) {
    if (!value) {
      sessionStorage.removeItem(key);
    } else {
      sessionStorage.setItem(key, JSON.stringify(value || {}));
    }
    this.change$.next(value);
  }

  get user(): User {
    if (!this._user) {
      let userInfo = this.get(USER_KEY)
      if (userInfo) {
        this._user = Object.assign(<User>{}, userInfo);
        this.set(USER_KEY, this._user);
      }
    }
    return this._user;
  }

  setUser(val: User) {
    this._user = val;
    this.set(USER_KEY, val);
  }

  clear() {
    this.change$.next(null);
  }

  change(): Observable<User> {
    return this.change$.pipe(share());
  }

  confirm (content: string, title: string = '提示'): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.modal.confirm({
        nzTitle: title,
        nzContent: content,
        nzOnOk: () => {
          observer.next('ok');
          observer.complete();
        },
        nzOnCancel: () => {
          observer.error('cancel');
          observer.complete();
        },
        nzOkText: '确定',
        nzCancelText: '取消'
      });
    });
  }

  toastSuccess (content, duration?: number): void {
    this.message.success(content, {
      nzDuration: duration || TOAST_DURATION
    });
  }

  toastWarning (content, duration?: number): void {
    this.message.warning(content, {
      nzDuration: duration || TOAST_DURATION
    });
  }

  toastInfo (content, duration?: number): void {
    this.message.info(content, {
      nzDuration: duration || TOAST_DURATION
    });
  }

  toastError (content, duration?: number): void {
    this.message.error(content, {
      nzDuration: duration || TOAST_DURATION
    });
  }

  checkNotEmpty (value?: any) {
    return typeof value !== 'undefined' && value !== null && value !== '';
  }
}
