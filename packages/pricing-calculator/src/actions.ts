import { ActionTypes } from './types';

import { APP_START } from './constants';

export const appStart = (): ActionTypes => ({
  type: APP_START,
});
