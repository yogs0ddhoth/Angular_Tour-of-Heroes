import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css'],
})
export class HeroFormComponent implements OnInit {
  @Input() hero?: Hero;
  @Output() heroEvent = new EventEmitter<Hero>();

  powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];
  submitted = false;

  constructor() {}

  onSubmit() {
    this.submitted = true;
    this.heroEvent.emit(this.hero);
  }
  ngOnInit(): void {}
  
}
