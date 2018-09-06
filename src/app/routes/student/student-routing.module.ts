import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentListComponent } from './studentInfo/student-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'studentList',
    pathMatch: 'full'
  },
  {
    path: 'studentList',
    component: StudentListComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class StudentRoutingModule {}
