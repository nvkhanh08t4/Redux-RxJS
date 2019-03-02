import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import {
  TYPES,
  Actions,
  ActionLoadTutorials,
  ActionLoadTutorialsFail } from './actions';

import { reducer } from './reducer';
import { TutorialService } from '../services/tutorial.service';
import { Tutorial } from '../models/tutorial.model';


@Injectable({
  providedIn: 'root'
})
export class Store {
  state: Observable<any>;
  actions: Subject<Actions> = new Subject();

  constructor(private tutorialService: TutorialService) {
    this.state = this.actions.pipe(
      reducer(),
      shareReplay(1)
    );
  }

  /**
   * Function dispatch on action to reducer
   * @param action : Action
   */
  dispatch(action: Actions) {
    this.actions.next(action);
  }

  /**
   * Get list tutorial from server when load app
   */
  getInitialTutorials() {
    this.tutorialService.getTutorials()
      .subscribe(
        (tutorials: Tutorial[]) => this.dispatch(new ActionLoadTutorials(TYPES.LOAD, tutorials)),
        (err) => this.dispatch(new ActionLoadTutorialsFail(TYPES.LOAD_FAIL, err))
      );
  }
}
