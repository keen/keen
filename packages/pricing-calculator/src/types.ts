import { APP_START } from './constants';

export type Options = {
  container: HTMLElement | string;
};

/* Actions */

interface AppStartAction {
  type: typeof APP_START;
}

export type ActionTypes = AppStartAction | {};
