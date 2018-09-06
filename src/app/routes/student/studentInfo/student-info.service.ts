
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRestService } from '../../../core';
import {a} from '@angular/core/src/render3';

enum StudentApiUrls {
  student = '/api/student',
  deleteStudent = '/api/student',
  checkPhone = '/api/student/checkPhone'
}

@Injectable()
export class StudentInfoService extends BaseRestService {
  constructor(
    private injector: Injector
  ) {
    super(injector);
  }

  // 查询学生列表
  public getStudentList (params?: any): Observable<any> {
    return this.getServer(StudentApiUrls.student, params);
  }
  // 删除学生
  public deleteStudent (id: number): Observable<any> {
    return this.deleteServer(StudentApiUrls.deleteStudent + '/' + id);
  }
  // 检查学生注册手机号是否可用
  public checkStudentPhone (phone: string): Observable<any> {
    return this.getServer(StudentApiUrls.checkPhone, { phone: phone});
  }
  // 添加学生
  public addStudent (data): Observable<any> {
    return this.postServer(StudentApiUrls.student, data);
  }
  // 编辑学生
  public modfiyStudent (data): Observable<any> {
    return this.putServer(StudentApiUrls.student + '/' + data.id, data);
  }
}
