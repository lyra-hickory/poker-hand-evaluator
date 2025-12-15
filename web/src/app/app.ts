import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CardForm} from './components/card-form/card-form';

@Component({
  selector: 'app-root',
  imports: [CardForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('poker-hand-evaluator');
}
