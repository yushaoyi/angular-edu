import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'studentStatusFilter' })
export class StudentStatusPipe implements PipeTransform {
  transform(status: number): string {
    const map = {
      0: '--',
      1: '正式'
    }
    return map[status] || '';
  }
}
