import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from './shared/sidenav';
import { AuthStore } from './shared/auth/auth.store';
import { loggedInNavItems, loggedOutNavItems } from './shared/nav-items';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, SidenavComponent],
  selector: 'app-root',
  template: ` <app-sidenav
    [(isOpen)]="isOpen"
    [navItems]="navItems()"
    [username]="user()"
  >
    <router-outlet />
  </app-sidenav>`,
})
export default class App {
  readonly isOpen = signal(false);
  readonly authStore = inject(AuthStore);

  user = this.authStore.user;

  navItems = computed(() =>
    this.authStore.isLoggedIn() ? loggedInNavItems : loggedOutNavItems,
  );
}
