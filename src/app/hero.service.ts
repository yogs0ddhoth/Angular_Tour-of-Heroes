import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

import { Hero } from './hero';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  #heroesUrl = 'api/heroes'; // URL to web api
  #httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** @POST add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.#heroesUrl, hero, this.#httpOptions).pipe(
      tap((newHero: Hero) => this.#log(`added hero with id=${newHero.id}`)),
      catchError(this.#handleError<Hero>('addHero'))
    );
  }

  /** @GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.#heroesUrl).pipe(
      tap((_) => this.#log('fetched heroes')),
      catchError(this.#handleError<Hero[]>('getHeroes', []))
    );
  }
  /** @GET hero by id. Will 404 if id not found. */
  getHero(id: number): Observable<Hero> {
    const url = `${this.#heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap((_) => this.#log(`fetched hero id=${id}`)),
      catchError(this.#handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** @GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.#heroesUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.#log(`found heroes matching "${term}"`)
          : this.#log(`no heroes matching "${term}"`)
      ),
      catchError(this.#handleError<Hero[]>('searchHeroes', []))
    );
  }

  /** @PUT update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.#heroesUrl, hero, this.#httpOptions).pipe(
      tap((_) => this.#log(`updated hero id${hero.id}`)),
      catchError(this.#handleError<any>('updateHero'))
    );
  }

  /** @DELETE delete the hero from the server */
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.#heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.#httpOptions).pipe(
      tap((_) => this.#log(`deleted hero id=${id}`)),
      catchError(this.#handleError<Hero>('deleteHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  #handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.#log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  #log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
