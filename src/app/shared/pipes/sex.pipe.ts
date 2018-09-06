import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sexFilter' })
export class SexPipe implements PipeTransform {
  transform(val: number): string {
    const map = {
      0: '男',
      1: '女'
    }
    return map[val] || '';
  }
}
