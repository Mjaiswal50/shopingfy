import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strTruncate'
})
export class StrTruncatePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return value.slice(0,120)+"...";
  }

}
