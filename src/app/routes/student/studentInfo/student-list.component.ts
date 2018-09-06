import { Component, OnInit, Injector } from '@angular/core';
import {BaseComponent} from '../../../core/base/base.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentInfoService } from './student-info.service';
import { UtilService } from '../../../core/services/util.service';

@Component({
  selector: 'student-list',
  templateUrl: './student-list.component.html',
})
export class StudentListComponent extends BaseComponent implements OnInit {
  isSearchLoading: boolean = false;
  results: Array<any> = [];
  params = {
    pageIndex: 1,
    pageSize: 10
  };
  total = 0;

  constructor(
    private injector: Injector,
    private srv: StudentInfoService,
    private util: UtilService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.search();
  }

  search () {
    console.log('a1')
    this.isSearchLoading = true
    this.srv.getStudentList(this.params)
      .subscribe(res => {
        this.results = res.list;
        this.total = res.total
        this.isSearchLoading = false;
      }, err => {
        this.isSearchLoading = false;
      });
  }

  handleAddStudent () {
    console.log('add');
    this.modal.create(AddStudentComponent, {
      data: {
        title: '添加学生',
        isEdit: false
      }}, { size: 600 })
      .subscribe(res => {
        this.search();
      }, err => {
        console.log('cancel');
      });
  }

  handleEditStudent (obj) {
    console.log(obj);
    this.modal.create(AddStudentComponent, {
      data: Object.assign({
        title: '修改学生',
        isEdit: true
      }, obj)
    }, { size: 600 })
      .subscribe(res => {
        this.search();
      }, err => {
        console.log('cancel');
      });
  }

  doDelete (obj) {
    obj.isDeleteSubmit = true;
    this.srv.deleteStudent(obj.id)
      .subscribe(res => {
        this.search()
        this.util.toastSuccess('删除成功！')
        obj.isDeleteSubmit = false;
      }, err => {
        obj.isDeleteSubmit = false;
      });
  }

  handleDeleteStudent (obj) {
    this.util.confirm('您确定要删除该学生吗？')
      .subscribe(res => {
        this.doDelete(obj);
      }, err => {

      });
  }
}
