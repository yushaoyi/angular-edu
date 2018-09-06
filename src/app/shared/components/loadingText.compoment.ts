import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'loading-text',
  template: '<a (click)="handleClick($event)" class="mr15 text-center">' +
  '<i *ngIf="loading" class="anticon anticon-spin anticon-loading mr15"></i><span *ngIf="!loading">{{content}}</span></a>'
})

export class LoadingTextCompoment {
  private isLoading: boolean = false;
  private content: string;

  @Input()
  set loading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  @Input()
  set text(value: string) {
    this.content = value;
  }

  @Output()
  clicked = new EventEmitter();

  get loading(): boolean {
    return this.isLoading;
  }

  handleClick (event): void {
    console.log('loading text start...')
    if (this.isLoading) return;
    console.log('loading text click...')
    event.stopPropagation();
    this.clicked.next();
  }
}
