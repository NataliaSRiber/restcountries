import { Pipe, PipeTransform } from '@angular/core';

// Uma interface que é implementada por pipes para realizar uma transformação
@Pipe({
  name: 'replaceKeys',
  standalone: true,
})

export class ReplaceKeysPipe implements PipeTransform {
  transform(value: any): string {
    if (!value) return '';

    return Object.keys(value).map(key => {
      const item = value[key];
      
      if (item && !item.symbol) {
        return `${item} (${key})`;
      }
      
      if (item.name && item.symbol) {
        return `${item.name} (${key})`;
      }

      return '';
    }).join(', ');
  }
}