import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  #searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  /** Push a search term into the observable stream. */
  search(term: string): void {
    this.#searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.#searchTerms.pipe(
      debounceTime(300), // wait 300ms after each keystroke before considering the term
      distinctUntilChanged(), // ignore new term if same as previous term
      switchMap( // switch to new search observable each time the term changes
        (term: string) => this.heroService.searchHeroes(term)
      )
    )
  }

}
