import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Pokeball } from './pokeball';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Pokeball],
  selector: 'spinner',
  styles: `
    .pokeball {
      animation: spin 1.5s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `,
  template: `<pokeball spin="true" />`,
})
export class Spinner {}
