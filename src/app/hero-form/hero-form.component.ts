import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css'],
})
export class HeroFormComponent implements OnInit {
  @Input() hero?: Hero;
  @Output() submitEvent = new EventEmitter<Hero>();

  powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];
  submitted = false;

  constructor() {}

  onSubmit() {
    this.submitted = true;
    this.submitEvent.emit(this.hero);
  }
  ngOnInit(): void {}
  
}
