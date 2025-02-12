import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { WA_LOCAL_STORAGE } from '@ng-web-apis/common';
import { explicitEffect } from 'ngxtension/explicit-effect';

const storageKey = 'pokemon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NgOptimizedImage],
  styles: `
    main {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: calc(100vh - 100px);
      font-family: 'Pokemon Solid', sans-serif;
    }

    .logo {
      margin-bottom: 20px;
    }

    form {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 16px;
      align-items: center;
      background: #fff;
      padding: 24px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      min-width: clamp(200px, 50%, 400px);
    }

    input[type='text'] {
      padding: 10px;
      border: 2px solid #e3350d;
      border-radius: 5px;
      font-size: 16px;
      width: 100%;
    }

    button {
      background: #e3350d;
      color: #fff;
      border: none;
      margin-top: 16px;
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.3s;
    }

    button:hover {
      background: #c12c0b;
    }
  `,
  template: ` <main>
    <img
      class="logo"
      ngSrc="/pokemon-logo.svg"
      height="99"
      width="269"
      priority
      alt="Pokémon Logo"
    />
    <form (submit)="search()">
      <input
        type="text"
        placeholder="Pokemon name"
        [(ngModel)]="name"
        name="name"
        required
        #searchInput
      />
      <button type="submit">Search</button>
    </form>
  </main>`,
})
export default class Search {
  router = inject(Router);
  localStorage = inject(WA_LOCAL_STORAGE);

  #initialName = this.localStorage.getItem(storageKey) ?? '';

  name = signal<string>(this.#initialName);

  #storageEffect = explicitEffect([this.name], ([name]) => {
    this.localStorage.setItem(storageKey, name);
  });

  async search() {
    const name = this.name().trim().toLowerCase();
    if (!name) return;
    await this.router.navigate(['/pokemon', name]);
  }
}
