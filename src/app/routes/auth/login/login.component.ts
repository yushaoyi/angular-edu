import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthService } from '../../../layout/auth/auth.service';
import { UtilService } from '../../../core/services/util.service';
import { Router } from '@angular/router';


@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  isSubmit = false;


  constructor(
    private fb: FormBuilder,
    private authSrv: AuthService,
    private util: UtilService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      remember: [ true ]
    });
  }

  submitForm(event, value): void {
    event.preventDefault();
    if (!this.validateForm.valid) {
      for (const key in this.validateForm.controls) {
        this.validateForm.controls[ key ].markAsDirty();
        this.validateForm.controls[ key ].updateValueAndValidity();
      }
      return;
    }
    this.isSubmit = true
    this.authSrv.login(value)
      .subscribe(res => {
        this.util.setUser(res)
        this.util.toastSuccess('登录成功！');
        this.isSubmit = false;
        this.router.navigateByUrl('/student/studentList');
      }, err => {
        console.log(err)
        this.isSubmit = false;
      });
  }

}
