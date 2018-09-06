import {
  Component,
  Input,
  Output,
  OnInit,
  OnDestroy,
  EventEmitter,
  HostListener,
  ElementRef,
  Renderer2
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'load-text',
  template: `
    <a><i *ngIf="isLoading" class="anticon anticon-spin anticon-loading mr5"></i>
    <span><ng-content></ng-content></span></a>
  `
})
export class LoadTextComponent implements OnInit, OnDestroy {
  private _loading = false;
  private el: HTMLElement;

  @Input()
  set isLoading(value: boolean) {
    this._loading = value;
    if (value) {
      this.renderer.addClass(this.el, 'a-disabled');
    } else {
      this.renderer.removeClass(this.el, 'a-disabled');
    }
  }

  get isLoading(): boolean {
    return this._loading;
  }

  @Output() dClick = new EventEmitter();
  private clicks = new Subject<any>();
  private subscription: Subscription;

  @HostListener('click', ['$event'])
  onClick(e: Event): void {
      console.log('child click')
      e.preventDefault();
      e.stopPropagation();
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.subscription = this.clicks
      .subscribe(e => this.dClick.emit(e));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
