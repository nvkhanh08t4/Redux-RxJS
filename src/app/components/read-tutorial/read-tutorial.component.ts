import {
  Component,
  OnInit,
  Output,
  EventEmitter } from '@angular/core';
import { Store } from 'src/app/state/store';
import { Tutorial } from 'src/app/models/tutorial.model';
import { Observable } from 'rxjs';
import {
  TYPES,
  ActionDeleteTutorial,
  ActionDeleteTutorialFail
} from 'src/app/state/actions';
import { TutorialService } from 'src/app/services/tutorial.service';
import { AppConstants as APP } from './../../app.constants';

@Component({
  selector: 'app-read-tutorial',
  templateUrl: './read-tutorial.component.html',
  styleUrls: ['./read-tutorial.component.scss']
})
export class ReadTutorialComponent implements OnInit {
  tutorials: Observable<Tutorial[]>;
  popoverTitle: string = APP.DELETE;
  popoverMessage: string = APP.MESSAGE_CONFIRM_DELETE;
  @Output() eventEditTutorial = new EventEmitter<Tutorial>();

  constructor(
    private store: Store,
    private tutorialService: TutorialService
  ) { }

  ngOnInit() {
    this.store.getInitialTutorials();
    this.tutorials = this.store.state;
  }

  /**
   * Handle action when click confirm delete
   * @param index : number
   * @param tutorial Tutorial
   */
  deleteTutorial(index: number, tutorial: Tutorial) {
    this.tutorialService.deleteTutorial(tutorial.id)
      .subscribe(
        () => this.store.dispatch(new ActionDeleteTutorial(TYPES.DELETE, index)),
        (err) => this.store.dispatch(new ActionDeleteTutorialFail(TYPES.DELETE_FAIL, err))
      );
  }

  /**
   * Handle action when click icon delete
   * @param index : number
   * @param tutorial : Tutorial
   */
  confirmDeleteTutorial(index: number, tutorial: Tutorial) {
    this.deleteTutorial(index, tutorial);
  }

  /**
   * Handle click icon edit.
   * Emit tutorial for app component
   * @param tutorial : Tutorial
   */
  editTutorial(tutorial: Tutorial): void {
    this.eventEditTutorial.emit(tutorial);
  }
}
