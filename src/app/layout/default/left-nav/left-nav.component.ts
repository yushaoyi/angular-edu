import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MENU } from '../../../core';
import { ActivatedRoute, Router } from '@angular/router';

// todo add tooltips
@Component({
  selector: 'left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent implements OnInit {
  @Output() onToggle = new EventEmitter<boolean>();
  public menuList;
  public activeMenu: string;
  public isCollapsed = false;
  constructor(private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.menuList = MENU;
    // console.log(this.router)
    this.activeMenu = this.router.url;
    // console.log(activateRoute);
  }

  ngOnInit() {
  }

  public menuSelect(item) {
    this.activeMenu = item.routeUrl;
    this.router.navigateByUrl(item.routeUrl);
  }

  public toggleCollapse () {
    this.isCollapsed = !this.isCollapsed;
    this.onToggle.emit(this.isCollapsed);
  }

}
