import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'mbTogb'})
export class MbToGbPipe implements PipeTransform {
  transform(value: number): number {
    return parseFloat((value / 1000).toFixed(2))
  }
}