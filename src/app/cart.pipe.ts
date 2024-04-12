import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cart',
  standalone: true
})
export class CartPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
