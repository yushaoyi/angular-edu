/**
 * core 核心模块
 * 提供核心服务
 * 由于ng的服务是全局单例的，
 * 所以核心服务只需由核心模块声明，并由
 * 根模块包含一次即可被全局应用所有组件共用
 */
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { AjaxInterceptor } from './interceptors/ajax.interceptor';
import { UtilService } from './services/util.service';
import { UiService } from './services/ui.service';

const SERVICES = [
  UtilService,
  // UiService
];

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    ...SERVICES,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AjaxInterceptor,
      multi: true // 注意multi: true选项。这是必须的，因为它会告诉 Angular 这个 HTTP_INTERCEPTORS 表示的是一个数组，而不是单个的值。
    }
  ]
})

export class CoreModule {
  // 禁止多次导入CoreModule
  constructor (
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
