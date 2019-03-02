import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  SimpleChange } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

import { Store } from 'src/app/state/store';
import {
  TYPES,
  ActionAddTutorial,
  ActionAddTutorialFail,
  ActionUpdateTutorial,
  ActionUpdateTutorialFail
} from 'src/app/state/actions';
import { Tutorial } from '../../models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';
import { AppConstants as APP } from '../../app.constants';

@Component({
  selector: 'app-create-tutorial',
  templateUrl: './create-tutorial.component.html',
  styleUrls: ['./create-tutorial.component.scss']
})
export class CreateTutorialComponent implements OnChanges, OnInit {
  tutorialForm: FormGroup;
  add = APP.ADD;
  update = APP.UPDATE;
  name = APP.NAME;
  url = APP.URL;
  id = APP.ID;
  @Input() tutorial: Tutorial;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private tutorialService: TutorialService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.tutorialForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.maxLength(100)
      ]],
      url: ['', [
        Validators.required
      ]],
      id: ['', [
        Validators.required
      ]],
    });
  }

  /**
   * Fill value of tutorial for tutorialForm when click icon edit
   * @param changes : SimpleChanges
   */
  ngOnChanges(changes: SimpleChanges): void {
    const tutorial: SimpleChange = changes.tutorial;
    if (tutorial.currentValue) {
      this.tutorialForm.patchValue({
        name: tutorial.currentValue['name'],
        url: tutorial.currentValue['url'],
        id: tutorial.currentValue['id']
      });
    }
  }

  /**
   * Handle action when click button 'Add tutorial`
   * @param tutorial : Tutorial
   */
  addTutorial(tutorial: Tutorial) {
    this.tutorialService.addTutorial(tutorial)
      .subscribe(
        (res: Tutorial) => this.store.dispatch(new ActionAddTutorial(TYPES.ADD, res)),
        (err) => this.store.dispatch(new ActionAddTutorialFail(TYPES.ADD_FAIL, err))
      );
    // reset tutorialForm
    this.tutorialForm.reset();
  }

  /**
   * Handle action when click button 'Update tutorial`
   * @param tutorial : Tutorial
   */
  editTutorial(tutorial: Tutorial) {
    this.tutorialService.updateTutorial(tutorial.id, tutorial)
      .subscribe(
        (res: Tutorial) => this.store.dispatch(new ActionUpdateTutorial(TYPES.UPDATE, res)),
        (err) => this.store.dispatch(new ActionUpdateTutorialFail(TYPES.UPDATE_FAIL, err))
      );
    // reset @Input tutorial object
    this.tutorial = null;
    // reset tutorialForm
    this.tutorialForm.reset();
  }
}
