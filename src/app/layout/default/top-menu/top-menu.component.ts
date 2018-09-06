import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../core/services/util.service';
import { LayoutService } from '../layout.service';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  constructor(
    public util: UtilService,
    private laySrv: LayoutService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.util.change().subscribe((res: any) => {
      console.log(res);
    });
  }

  logout () {
    this.auth.logout()
      .subscribe(res => {
        this.util.toastSuccess('退出成功！');
        setTimeout(_ => {
          this.util.setUser(null)
          this.router.navigateByUrl('/auth/login');
        }, 1200);
      }, err => {

      });
  }

  modifyPassword () {

  }


}
