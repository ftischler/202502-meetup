import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthStore } from '../shared/auth/auth.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  styles: `
    h1 {
      text-align: center;
      color: #ffcb05;
      font-family: 'Pokemon Solid', sans-serif;
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #fff;
      padding: 24px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      margin: 0 auto;
    }

    label {
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;
      font-size: 16px;
      color: #3b4cca;
    }

    input {
      padding: 10px;
      border: 2px solid #ffcb05;
      border-radius: 5px;
      font-size: 16px;
      width: 100%;
    }

    button {
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.3s;
    }

    button[type='submit'] {
      background: #ffcb05;
      color: #3b4cca;

      &:hover {
        background: #e6b800;
      }
    }

    button[type='reset'] {
      background: #3b4cca;
      color: #ffcb05;

      &:hover {
        background: #2a3e9a;
      }
    }

    .error {
      color: red;
      font-size: 16px;
      margin-bottom: 16px;
      text-align: center;
    }

    .buttons {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  `,
  template: `<h1>Login</h1>
    <form (submit)="login()">
      <label>
        Email:
        <input type="email" [(ngModel)]="email" name="email" #emailInput />
      </label>
      <label>
        Password:
        <input type="password" [(ngModel)]="password" name="password" />
      </label>
      @if (authStore.authError()) {
        <div class="error">
          Error: this user does not exist or your password was wrong
        </div>
      }
      <div class="buttons">
        <button type="submit">Login</button>
        <button type="reset" (click)="emailInput.focus()">Reset</button>
      </div>
    </form>`,
})
export default class Login {
  readonly authStore = inject(AuthStore);

  email = signal('');
  password = signal('');

  credentials = computed(() => ({
    email: this.email(),
    password: this.password(),
  }));

  async login() {
    await this.authStore.login(this.credentials());
  }
}
