import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export type NavItem = {
  path: string;
  label: string;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translateX(0)',
        }),
      ),
      state(
        'out',
        style({
          transform: 'translateX(-100%)',
        }),
      ),
      transition('in => out', animate('300ms ease-in-out')),
      transition('out => in', animate('300ms ease-in-out')),
    ]),
  ],
  imports: [RouterLink],
  selector: 'app-sidenav',
  styles: [
    `
      .sidenav-container {
        height: 50px;
        width: 100%;
      }

      .sidenav-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 998;
      }

      .sidenav {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        width: 250px;
        background-color: #f8f9fa;
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
        z-index: 999;
      }

      .sidenav nav {
        padding: 20px;
      }

      .sidenav ul {
        list-style-type: none;
        padding: 0;
      }

      .sidenav li {
        margin-bottom: 10px;
      }

      .sidenav a {
        text-decoration: none;
        color: #333;
        font-size: 16px;
      }

      .sidenav-content {
        padding: 20px;

        header {
          display: flex;
          align-items: center;
          gap: 16px;
        }
      }

      .toggle-btn {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        padding: 10px;
      }
    `,
  ],
  template: `
    <div class="sidenav-container">
      @if (isOpen()) {
        <div class="sidenav-overlay" (click)="toggleSidenav()"></div>
      }
      <div class="sidenav" [@slideInOut]="isOpen() ? 'in' : 'out'">
        <nav>
          <ul>
            @for (item of navItems(); track item.path) {
              <li>
                <a [routerLink]="item.path" (click)="setIsOpen(false)">{{
                  item.label
                }}</a>
              </li>
            }
          </ul>
        </nav>
      </div>
      <div class="sidenav-content">
        <header>
          <button class="toggle-btn" (click)="toggleSidenav()">
            {{ isOpen() ? '✕' : '☰' }}
          </button>
          <div class="user">
            @if (username(); as username) {
              Hello {{ username }}
            } @else {
              Please login to use this app
            }
          </div>
        </header>
        <ng-content />
      </div>
    </div>
  `,
})
export class SidenavComponent {
  readonly isOpen = model<boolean>(false);
  readonly navItems = input.required<NavItem[]>();
  readonly username = input<string>();

  toggleSidenav() {
    this.setIsOpen(!this.isOpen());
  }

  setIsOpen(value: boolean) {
    this.isOpen.set(value);
  }
}
