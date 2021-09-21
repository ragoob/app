import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'progressStatus'})
export class PercentageToProgressColorPipe implements PipeTransform {
  transform(value: string): string {
    if(!value) return ''
    const percentage= parseFloat(value.replace("%",""))
    if(percentage > 50 && percentage < 80){
        return 'warning'
    }else if(percentage >= 80 ){
      console.log(percentage)
        return 'danger'
    }else{
        return 'info'
    }
  }
}