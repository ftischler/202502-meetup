import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { Pokemon, Type } from '../../models/pokemon';
import { DecimalPipe, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { ConcatPipe } from '../concat.pipe';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, DecimalPipe, TitleCasePipe, ConcatPipe],
  selector: 'pokemon-card',
  styleUrl: './pokemon-card.scss',
  templateUrl: './pokemon-card.html',
})
export class PokemonCard {
  pokemon = input.required<Pokemon>();
  selected = model(false);

  toggleSelected() {
    this.selected.update((selected) => !selected);
  }

  mapType({ type }: Type) {
    return type.name;
  }
}
