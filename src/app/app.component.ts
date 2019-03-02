import { Component } from '@angular/core';
import { Tutorial } from './models/tutorial.model';
import { AppConstants as APP } from '../app/app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = APP.TITLE;
  description = APP.DESCRIPTION;

  public tutorial: Tutorial;

  sendTutorial(tutorial: Tutorial) {
    this.tutorial = tutorial;
  }
}
