import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mapToPokemon, Pokemon } from '../../models/pokemon';
import { map } from 'rxjs';
import { POKE_API_URL } from '../providers/poke-api-url';

export const injectPokeApiClient = () => {
  const baseUrl = inject(POKE_API_URL);
  const httpClient = inject(HttpClient);

  return {
    getPokemonByName: (name: string) => {
      const url = `${baseUrl}/${name.trim().toLowerCase().replace(/\s/g, '')}`;

      return httpClient
        .get<Pokemon>(url)
        .pipe(map((pokemon) => mapToPokemon(pokemon)));
    },
  };
};
