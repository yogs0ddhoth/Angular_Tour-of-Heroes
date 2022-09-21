import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = HEROES.map(
      hero => new Hero(hero.id, hero.name, 'lorem ipsum')
    );

    return { heroes };
  }

  /**
   * Overrides the genId method to ensure that a hero always has an id:
   * @returns If the heroes array is empty, the method below returns the initial number (11). Else, if the heroes array is not empty, the method below returns the highest hero id + 1.
   */
  genId(heroes: Hero[]): number {
    return heroes.length > 0
      ? Math.max(...heroes.map((hero) => hero.id)) + 1
      : 11;
  }
  constructor() {}
}
