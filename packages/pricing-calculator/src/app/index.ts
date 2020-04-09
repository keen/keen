import App from './app.component';
import { appStart, setDevice } from './actions';
import { getDevice } from './selectors';
import { appReducer, ReducerState as AppReducerState } from './reducer';

export { App, AppReducerState, appStart, getDevice, setDevice, appReducer };
