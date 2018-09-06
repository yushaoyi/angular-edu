import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule, NZ_MESSAGE_CONFIG } from 'ng-zorro-antd';
import { SexPipe } from './pipes/sex.pipe';
import { LoadingTextCompoment } from './components/loadingText.compoment';
import { LoadTextComponent } from './components/loadText.component';
import { ModalHelper } from './helper/modal.helper';
import { TOAST_DURATION } from '../core';

const THIRD_MODULES = [
  NgZorroAntdModule
];


const PIPES = [
  SexPipe,
];

const COMPONENTS = [
  LoadTextComponent,
  LoadingTextCompoment
];

const DIRECTIVES = [];

const SERVICES = [
  ModalHelper
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...THIRD_MODULES
  ],
  declarations: [
    ...PIPES,
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  providers: [
    ...SERVICES,
    // {
    //   nzDuration: 3000,
    //   nzMaxStack: 7,
    //   nzPauseOnHover: true,
    //   nzAnimate: true
    // }
    { provide: NZ_MESSAGE_CONFIG, useValue: { nzDuration: TOAST_DURATION }}
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...THIRD_MODULES,
    ...COMPONENTS,
    ...PIPES,
    ...DIRECTIVES,
  ]
})


export class SharedModule { }
