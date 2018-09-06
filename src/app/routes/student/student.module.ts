import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { StudentRoutingModule } from './student-routing.module';
import { AddStudentComponent } from './studentInfo/add-student/add-student.component';
import { StudentListComponent } from './studentInfo/student-list.component';
import { StudentInfoService } from './studentInfo/student-info.service';
import { StudentStatusPipe } from './student.pipe';

const PIPES = [
  StudentStatusPipe
]
const SERVICES = [
  StudentInfoService
]

const DIRECTIVES = [

]

const COMPONENTS = [
  StudentListComponent
]

const COMPONENTS_NO_ROUNT = [
  AddStudentComponent
]

@NgModule({
  imports: [
    SharedModule,
    StudentRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NO_ROUNT,
    ...PIPES,
    ...DIRECTIVES
  ],
  exports: [

  ],
  entryComponents: COMPONENTS_NO_ROUNT,
  providers: [
    ...SERVICES
  ]
})

export class StudentModule { }
