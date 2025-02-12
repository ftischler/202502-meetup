import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { injectAuth } from '../shared/auth/inject-auth';
import { Router } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-register',
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
      background: #ffcb05;
      color: #3b4cca;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.3s;
    }

    button:hover {
      background: #e6b800;
    }
  `,
  template: `<h1>Register</h1>
    <form (submit)="register()">
      <label>
        Email:
        <input type="email" [(ngModel)]="email" name="email" />
      </label>
      <label>
        Password:
        <input type="password" [(ngModel)]="password" name="password" />
      </label>
      <button type="submit">Register</button>
    </form>`,
  imports: [FormsModule],
})
export default class Register {
  readonly auth = injectAuth();
  readonly router = inject(Router);

  email = signal('');
  password = signal('');

  credentials = computed(() => ({
    email: this.email(),
    password: this.password(),
  }));

  async register() {
    this.auth.register(this.credentials());
    await this.router.navigate(['/login']);
  }
}
