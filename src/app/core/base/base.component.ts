import { Injector } from '@angular/core';
import { ModalHelper } from '../../shared/helper/modal.helper';

export abstract class BaseComponent {
  protected modal: ModalHelper;
  constructor(
    private baseInjector: Injector
  ) {
    this.modal = this.baseInjector.get(ModalHelper);
  }
}
