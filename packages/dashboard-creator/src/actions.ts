import { ActionTypes } from './types';

import { APP_START, GET_DASHBOARDS } from './constants';

export const appStart = (
  projectId: string,
  masterKey: string
): ActionTypes => ({
  type: APP_START,
  payload: { projectId, masterKey },
});

export const getDashboards = (): ActionTypes => ({
  type: GET_DASHBOARDS,
});
