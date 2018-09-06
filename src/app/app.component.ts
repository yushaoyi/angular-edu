import {Component, OnInit} from '@angular/core';
import { UtilService } from './core/services/util.service';
import {NavigationEnd, NavigationError, RouteConfigLoadStart, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'edu-admin';

  constructor (
    private util: UtilService,
    private router: Router
  ) {
    router.events.subscribe(evt => {
      if (evt instanceof RouteConfigLoadStart) {
        console.log('start')
        return;
      }
      if (evt instanceof NavigationError) {
        return;
      }
      if (evt instanceof NavigationEnd) {
        console.log('end')
      }
    });
  }

  ngOnInit () {
    if (!this.util.user) {
      this.router.navigateByUrl('/auth');
    }
  }
}
