import { scan } from 'rxjs/operators';
import { Actions, TYPES } from './actions';
import { Tutorial } from '../models/tutorial.model';

/** Communicate with the Redux DevTool extension directly*/
export const win = window as any;
const devTools = win.__REDUX_DEVTOOLS_EXTENSION__.connect();

export const reducer = () =>
  scan<any>((state: Tutorial[], action: Actions) => {
    let next;
    switch (action.type) {
      case TYPES.LOAD:
        next = action.payload;
        break;
      case TYPES.LOAD_FAIL:
        next = { ...state, err: action.payload };
        break;
      case TYPES.ADD:
        next = [].concat(state).concat(action.payload);
        break;
      case TYPES.ADD_FAIL:
        next = { ...state, err: action.payload };
        break;
      case TYPES.UPDATE:
        const tutorial = state.find(item => item.id === action.payload['id']);
        const indexUpdate = state.indexOf(tutorial);
        const beforeTutorials = state.slice(0, indexUpdate);
        const afterTutorials = state.slice(indexUpdate + 1);
        next = [].concat(beforeTutorials).concat(action.payload).concat(afterTutorials);
        break;
      case TYPES.UPDATE_FAIL:
        next = { ...state, err: action.payload };
        break;
      case TYPES.DELETE:
        next = state.filter((item, indexDel) => indexDel !== action.payload);
        break;
      case TYPES.DELETE_FAIL:
        next = { ...state, err: action.payload };
        break;
      default:
        next = state;
        break;
    }
    /** Send inform for redux devTool */
    devTools.send(action.type, next);

    return next;

  }, {});
