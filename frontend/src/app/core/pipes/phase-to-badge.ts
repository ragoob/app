import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'phaseToBadge'})
export class PhaseToBadge implements PipeTransform {
  transform(value: string): string {
    if(!value){return ''}
    switch(value.toLowerCase()){
        case 'active':
        case 'running':  
        {
            return 'success'
        }

        case 'terminating'  :
        case 'updating':  
        {
            return 'warning'
        }

        case 'error' : {
          return 'danger'
        }

        default: {
            return 'info'
        }
    }
  }
}