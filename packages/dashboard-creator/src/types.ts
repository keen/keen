import { APP_START, GET_DASHBOARDS } from './constants';

interface AppStartAction {
  type: typeof APP_START;
  payload: { projectId: string; masterKey: string };
}

interface GetDashboardsAction {
  type: typeof GET_DASHBOARDS;
}

export type ActionTypes = AppStartAction | GetDashboardsAction;
