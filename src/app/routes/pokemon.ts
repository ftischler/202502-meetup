import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { injectPokeApiClient } from '../shared/poke-api/poke-api-client';
import { PokemonCard } from '../shared/pokemon-card/pokemon-card';
import { Spinner } from '../shared/spinner';
import { TitleCasePipe } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PokemonCard, Spinner, TitleCasePipe],
  styles: `
    :host {
      display: grid;
      place-items: center;
      height: calc(100vh - 100px);
    }

    div {
      margin-top: 60px;
    }
  `,
  template: `
    <div>
      @if (pokemonResource.isLoading()) {
        <spinner />
      }
      @if (pokemonResource.value(); as pokemon) {
        <pokemon-card [pokemon]="pokemon" />
      }
      @if (pokemonResource.error()) {
        <p>
          Error loading "{{ name() | titlecase }}". Is this a real english name
          of a Pokémon?
        </p>
      }
    </div>
  `,
})
export default class Pokemon {
  readonly pokeApiClient = injectPokeApiClient();

  readonly name = input.required<string>();

  params = computed(() => ({ name: this.name() }));

  pokemonResource = rxResource({
    request: this.params,
    loader: ({ request: { name } }) =>
      this.pokeApiClient.getPokemonByName(name),
  });
}
