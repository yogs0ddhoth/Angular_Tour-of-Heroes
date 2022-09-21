export class Hero {
  #alterEgo?: string;

  constructor(
    public id: number,
    public name: string,
    public power: string,
    alterEgo?: string
  ) {
    if (alterEgo) {
      this.#alterEgo = alterEgo;
    }
  }

  get alterEgo() { 
    return this.#alterEgo 
      ? this.#alterEgo 
      : 'UNKNOWN'; 
  }
  set alterEgo(alterEgo: string) { this.#alterEgo = alterEgo; }
}
