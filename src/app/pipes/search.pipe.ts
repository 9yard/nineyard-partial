import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchText: string): any {
    if (!items || !searchText) {
      return items;
    }

    const results = [];
    items.forEach(element => {
      for (const key in element) {
        if (element[key] && element[key].indexOf(searchText.toUpperCase()) !== -1) {
          results.push(element);
          break;
        }
      }
    });
    return results;
  }

}
