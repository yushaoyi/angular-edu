import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { NzModalService, ModalOptionsForService } from 'ng-zorro-antd';

export interface ModalHelperOptions {
  /** 大小；例如：lg、600，默认：`lg` */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '' | number;
  /** 对话框 `ModalOptionsForService` 参数 */
  modalOptions?: ModalOptionsForService;
  /** 是否精准（默认：`true`），若返回值非空值（`null`或`undefined`）视为成功，否则视为错误 */
  exact?: boolean;
  /** 是否包裹标签页 */
  includeTabs?: boolean;
}

@Injectable()
export class ModalHelper {

  private zIndex = 500;
  constructor(private srv: NzModalService) {

  }

  create(
    comp: any,
    params?: any,
    options?: ModalHelperOptions
  ): Observable<any> {
    console.log('aa')
    options = Object.assign({
      size: 'lg',
      exact: true,
      includeTabs: false
    }, options);
    return Observable.create((observer: Observer<any>) => {
      let cls = '',
        width = '';
      if (options.size) {
        if (typeof options.size === 'number') {
          width = `${options.size}px`;
        } else {
          cls = `modal-${options.size}`;
        }
      }
      if (options.includeTabs) {
        cls += ' modal-include-tabs';
      }
      const defaultOptions: ModalOptionsForService = {
        nzWrapClassName: cls,
        nzContent: comp,
        nzWidth: width ? width : undefined,
        nzFooter: null,
        nzComponentParams: params,
        nzZIndex: ++this.zIndex,
        nzMaskClosable: false
      };
      const subject = this.srv.create(
        Object.assign(defaultOptions, options.modalOptions),
      );
      const afterClose$ = subject.afterClose.subscribe((res: any) => {
        if (options.exact === true) {
          if (res != null) {
            observer.next(res);
          } else {
            observer.error(res);
          }
        } else {
          observer.next(res);
        }
        observer.complete();
        afterClose$.unsubscribe();
      });
    });
  }
}
