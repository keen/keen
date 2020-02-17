import {
  ActionTypes,
  Dashboard,
  Widget,
  DashboardMetaData,
  GridPosition,
} from './types';

import {
  APP_START,
  ADD_WIDGET,
  SET_WIDGETS,
  UPDATE_WIDGETS_POSITION,
  GET_DASHBOARDS,
  GET_DASHBOARDS_SUCCESS,
  GET_DASHBOARDS_FAILURE,
  GET_DASHBOARD_BY_ID,
  GET_DASHBOARD_BY_ID_SUCCESS,
  GET_DASHBOARD_BY_ID_FAILURE,
  DELETE_DASHBOARD,
  DELETE_DASHBOARD_SUCCESS,
  DELETE_DASHBOARD_FAILURE,
  CREATE_DASHBOARD,
  CREATE_DASHBOARD_SUCCESS,
  CREATE_DASHBOARD_FAILURE,
  SAVE_DASHBOARD,
  SAVE_DASHBOARD_SUCCESS,
  SAVE_DASHBOARD_FAILURE,
} from './constants';

export const appStart = (
  projectId: string,
  masterKey: string
): ActionTypes => ({
  type: APP_START,
  payload: { projectId, masterKey },
});

export const setWidgets = (widgets: Record<string, Widget>): ActionTypes => ({
  type: SET_WIDGETS,
  payload: { widgets },
});

export const updateWidgetsPosition = (
  widgets: Record<string, GridPosition>
): ActionTypes => ({
  type: UPDATE_WIDGETS_POSITION,
  payload: { widgets },
});

export const addWidget = (
  dashboardId: string,
  widgetId: string,
  position: GridPosition
): ActionTypes => ({
  type: ADD_WIDGET,
  payload: { dashboardId, widgetId, position },
});

export const createDashboard = (): ActionTypes => ({
  type: CREATE_DASHBOARD,
});

export const createDashboardSuccess = (
  id: string,
  dashboard: Dashboard
): ActionTypes => ({
  type: CREATE_DASHBOARD_SUCCESS,
  payload: { id, dashboard },
});

export const createDashboardFailure = (): ActionTypes => ({
  type: CREATE_DASHBOARD_FAILURE,
});

export const getDashboards = (): ActionTypes => ({
  type: GET_DASHBOARDS,
});

export const getDashboardsSuccess = (
  dashboards: DashboardMetaData[]
): ActionTypes => ({
  type: GET_DASHBOARDS_SUCCESS,
  payload: { dashboards },
});

export const getDashboardsFailure = (): ActionTypes => ({
  type: GET_DASHBOARDS_FAILURE,
});

export const getDashboardById = (id: string): ActionTypes => ({
  type: GET_DASHBOARD_BY_ID,
  payload: { id },
});

export const getDashboardByIdSuccess = (
  id: string,
  dashboard: Dashboard
): ActionTypes => ({
  type: GET_DASHBOARD_BY_ID_SUCCESS,
  payload: { id, dashboard },
});

export const getDashboardByIdFailure = (): ActionTypes => ({
  type: GET_DASHBOARD_BY_ID_FAILURE,
});

export const deleteDashboard = (id: string): ActionTypes => ({
  type: DELETE_DASHBOARD,
  payload: { id },
});

export const deleteDashboardSuccess = (id: string): ActionTypes => ({
  type: DELETE_DASHBOARD_SUCCESS,
  payload: { id },
});

export const deleteDashboardFailure = (): ActionTypes => ({
  type: DELETE_DASHBOARD_FAILURE,
});

export const saveDashboard = (id: string): ActionTypes => ({
  type: SAVE_DASHBOARD,
  payload: { id },
});

export const saveDashboardSuccess = (id: string): ActionTypes => ({
  type: SAVE_DASHBOARD_SUCCESS,
  payload: { id },
});

export const saveDashboardFailure = (): ActionTypes => ({
  type: SAVE_DASHBOARD_FAILURE,
});
