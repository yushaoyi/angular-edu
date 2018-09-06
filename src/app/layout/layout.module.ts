import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
// layout default
import { LayoutComponent } from './default/layout.component';
import { FooterComponent } from './default/footer/footer.component';
import { TopMenuComponent } from './default/top-menu/top-menu.component';
import { LeftNavComponent } from './default/left-nav/left-nav.component';
import { LayoutService } from './default/layout.service';
// auth
import { AuthComponent } from './auth/auth.component';
import { GlobalFooterComponent } from './auth/global-footer/global-footer.component';
import { AuthService } from './auth/auth.service';

const COMPONENTS = [
  LayoutComponent,
  FooterComponent,
  TopMenuComponent,
  LeftNavComponent
]

const AUTH = [
  AuthComponent,
  GlobalFooterComponent
]

const COMPONENTS_NO_ROUNT = []

const SERVICES = [
  LayoutService,
]

const AUTH_SERVICES = [
  AuthService
]

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NO_ROUNT,
    ...AUTH
  ],
  exports: [
    ...COMPONENTS,
    ...AUTH
  ],
  entryComponents: [
    ...COMPONENTS_NO_ROUNT
  ],
  providers: [
    ...SERVICES,
    ...AUTH_SERVICES
  ]
})

export class LayoutModule {}
