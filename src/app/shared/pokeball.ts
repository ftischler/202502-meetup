import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--size.px]': 'size()',
  },
  selector: 'pokeball',
  styles: `
    .pokeball {
      width: var(--size, 100px);
      height: var(--size, 100px);

      &.spin {
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
    }
  `,
  template: ` <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    class="pokeball"
    [class.spin]="spin()"
  >
    <circle
      cx="50"
      cy="50"
      r="48"
      fill="white"
      stroke="black"
      stroke-width="2"
    />
    <path
      d="M50 2 A48 48 0 0 1 98 50 L2 50 A48 48 0 0 1 50 2 Z"
      fill="#e3350d"
    />
    <rect x="2" y="48" width="96" height="4" fill="black" />
    <circle
      cx="50"
      cy="50"
      r="12"
      fill="white"
      stroke="black"
      stroke-width="2"
    />
    <circle cx="50" cy="50" r="8" fill="black" />
    <circle cx="50" cy="50" r="5" fill="white" />
  </svg>`,
})
export class Pokeball {
  readonly spin = input(false, { transform: booleanAttribute });
  readonly size = input(100);
}
