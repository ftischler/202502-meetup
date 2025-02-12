import { Pipe, PipeTransform } from '@angular/core';

export type ConcatPipeOptions<T> = {
  mapFn?: (element: T) => string;
  separator?: string;
};

@Pipe({
  name: 'concat',
})
export class ConcatPipe implements PipeTransform {
  transform<T>(
    value: T[],
    {
      mapFn = (element) => element as string,
      separator = ', ',
    }: ConcatPipeOptions<T> = {}
  ): string {
    return value.map(mapFn).join(separator);
  }
}
