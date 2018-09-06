import { Component, OnInit, OnDestroy , Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from '../../core/services/util.service';

@Component({
  selector: 'app-main',
  templateUrl: './layout.component.html',
  // styleUrls: ['./appMain.component.scss']
})

export class LayoutComponent implements OnInit, OnDestroy {
  isCollapsed: boolean;
  constructor(
    private util: UtilService
  ) {}

  ngOnInit() {

  }

  ngOnDestroy() {

  }

  onToggle(isCollapsed: boolean) {
    this.isCollapsed = isCollapsed;
  }
}
