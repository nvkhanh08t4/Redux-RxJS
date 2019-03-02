export enum TYPES {
  ADD = 'ADD',
  ADD_FAIL = 'ADD_FAIL',
  UPDATE = 'UPDATE',
  UPDATE_FAIL = 'UPDATE_FAIL',
  DELETE = 'DELETE',
  DELETE_FAIL = 'DELETE_FAIL',
  LOAD = 'LOAD',
  LOAD_FAIL = 'LOAD_FAIL',
}
import { Tutorial } from '../models/tutorial.model';

export class ActionLoadTutorials {
  constructor(public type: string, public payload: Tutorial[]) { }
}

export class ActionLoadTutorialsFail {
  constructor(public type: string, public payload: string) { }
}

export class ActionAddTutorial {
  constructor(public type: string, public payload: Tutorial) { }
}

export class ActionAddTutorialFail {
  constructor(public type: string, public payload: string) { }
}

export class ActionUpdateTutorial {
  constructor(public type: string, public payload: Tutorial) { }
}

export class ActionUpdateTutorialFail {
  constructor(public type: string, public payload: string) { }
}

export class ActionDeleteTutorial {
  constructor(public type: string, public payload: number) { }
}

export class ActionDeleteTutorialFail {
  constructor(public type: string, public payload: string) { }
}

export type Actions =
  | ActionLoadTutorials
  | ActionLoadTutorialsFail
  | ActionAddTutorial
  | ActionAddTutorialFail
  | ActionUpdateTutorial
  | ActionUpdateTutorialFail
  | ActionDeleteTutorial
  | ActionDeleteTutorialFail;
