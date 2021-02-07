import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter",
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], ...args: any[]): unknown {
    console.log(value, args);
    if (!value || !args || !args[0]) {
      return value;
    }
    
    return value.filter(item => item[args[0]] === args[1]);
  }
}
