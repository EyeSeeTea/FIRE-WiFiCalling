import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timer'
})
export class TimerPipe implements PipeTransform {

  transform(seconds: number): any {

    if (!seconds) {
      return '';
    }

    let h: string | number = Math.floor(seconds / 3600),
      m: string | number = Math.floor(seconds / 60) % 60,
      s: string | number = seconds % 60;
    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;

    return h + ':' + m + ':' + s;
  }

}
