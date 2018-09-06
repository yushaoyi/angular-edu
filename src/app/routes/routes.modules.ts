import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { RoutesRoutingModule } from './routes-routing.modules';

// auth pages
import { LoginComponent } from './auth/login/login.component';

const COMPONENTS = [
  LoginComponent
]

const COMPONENTS_NO_ROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    RoutesRoutingModule
  ],
  declarations: [...COMPONENTS, ...COMPONENTS_NO_ROUNT],
  entryComponents: COMPONENTS_NO_ROUNT
})

export class RoutesModule {}
