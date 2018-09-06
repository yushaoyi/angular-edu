import { Component, OnInit, Input } from '@angular/core';
import {BaseFormComponent} from '../../../../core/base/baseForm.component';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable, Observer} from 'rxjs';
import { StudentInfoService } from '../student-info.service';
import { UtilService } from '../../../../core/services/util.service';
import { NzModalRef } from 'ng-zorro-antd'

@Component({
  selector: 'app-student',
  templateUrl: './add-student.component.html',
})
export class AddStudentComponent extends BaseFormComponent implements OnInit {
  validateForm: FormGroup;
  model = {
    id: '',
    title: '添加学生',
    isEdit: false
  }

  fm = {
    name: '',
    phone: '',
    sex: 0
  }

  isSubmit = false;

  constructor(
    private fb: FormBuilder,
    private srv: StudentInfoService,
    private util: UtilService,
    private modalRef: NzModalRef
  ) {
    super();
    this.validateForm = this.fb.group({
      name: [ this.fm.name, [ Validators.required ] ],
      phone: [ this.fm.phone, [ Validators.required ], [ this.phoneValidator ] ],
      sex: [ this.fm.sex, [ Validators.required ]]
    });
  }

  @Input()
  set data(value: any) {
    if (value) {
      console.log(value);
      this.model.title = value.title ? value.title : '添加学生';
      this.model.isEdit = value.isEdit ? value.isEdit : false;
      this.fm.name = value.name ? value.name : '';
      this.fm.phone = value.phone ? value.phone : '';
      this.fm.sex = this.util.checkNotEmpty(value.sex) ? value.sex : 0;
      this.model.id = value.id ? value.id : '';
    }
    this.validateForm.setValue(this.fm);
  }

  // phoneValidator = (control: FormControl): { [ s: string ]: boolean } => {
  //   const PHONE_REGXP = /^1\d{10}$/;
  //   if (!control.value) {
  //     return { required: true };
  //   } else if (!PHONE_REGXP.test(control.value)) {
  //     return { error: true, phone: true };
  //   }
  // }

  phoneValidator = (control: FormControl) => Observable.create((observer: Observer<ValidationErrors>) => {
    const PHONE_REGXP = /^1\d{10}$/;
    console.log(control.value)
    if (!control.value) {
      observer.next({ error: true, required: true });
      observer.complete();
    } else if (!PHONE_REGXP.test(control.value)) {
      observer.next({ error: true, phone: true });
      observer.complete();
    } else if (!this.model.id) {
      this.checkStudentPhone(control.value, observer);
    } else {
      observer.next(null);
      observer.complete();
    }
  })

  checkStudentPhone (phone, observer) {
    this.srv.checkStudentPhone(phone)
      .subscribe(res => {
        observer.next(null);
        observer.complete();
      }, err => {
        observer.next({ error: true, exist: true });
        observer.complete();
      });
  }

  ngOnInit () {

  }

  doAdd (obj) {
    console.log('add')
    this.srv.addStudent(obj).subscribe(data => {
      console.log(data);
      this.util.toastSuccess('添加成功');
      this.modalRef.close(true);
    }, err => {

    });
  }

  doModify (obj) {
    console.log('modify')
    this.srv.modfiyStudent(obj).subscribe(data => {
      console.log(data);
      this.util.toastSuccess('编辑成功');
      this.modalRef.close(true);
    }, err => {

    })
  }

  submitForm = ($event, value) => {
    $event.preventDefault();
    console.log(value);

    if (!this.validateForm.valid) {
      for (const key in this.validateForm.controls) {
        this.validateForm.controls[ key ].markAsDirty();
        this.validateForm.controls[ key ].updateValueAndValidity();
      }
      return;
    }
    console.log('add student')
    let data = Object.assign({}, value)
    if (this.model.isEdit) {
      data.id = this.model.id
      this.doModify(data);
    } else {
      this.doAdd(data);
    }

  }

  cancel () {
    this.modalRef.destroy();
  }
  // resetForm(e: MouseEvent): void {
  //   e.preventDefault();
  //   this.validateForm.reset();
  //   for (const key in this.validateForm.controls) {
  //     this.validateForm.controls[ key ].markAsPristine();
  //     this.validateForm.controls[ key ].updateValueAndValidity();
  //   }
  // }
}
