import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
import { LayoutComponent } from '../layout/default/layout.component';
import { AuthComponent } from '../layout/auth/auth.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'student', pathMatch: 'full'},
      { path: 'student', loadChildren: './student/student.module#StudentModule'}
    ]
  },
  // {
  //   path: 'auth',
  //   component: AuthComponent,
  //   children: [
  //     {
  //       path: '',
  //       children: [
  //         {
  //           path: '',
  //           redirectTo: 'login',
  //           pathMatch: 'full'
  //         },
  //         {
  //           path: 'login',
  //           component: LoginComponent,
  //           data: { title: '登录' }
  //         }
  //       ]
  //     }
  //
  //   ]
  // },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
        data: { title: '登录' }
      }
    ]
  },
  { path: '**', redirectTo: 'auth' },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: environment.useHash })
  ],
  exports: [RouterModule]
})

export class RoutesRoutingModule {}
