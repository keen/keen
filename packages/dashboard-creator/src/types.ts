import {
  APP_START,
  SET_WIDGETS,
  UPDATE_WIDGETS_POSITION,
  ADD_WIDGET,
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

export type GridPosition = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type Widget = {
  id: string;
  position: GridPosition;
};

export type Dashboard = {
  id: string;
  version: string;
  widgets: string[];
};

export type DashboardMetaData = {
  id: string;
};

/* State */

export type AppState = {
  widget: {
    widgets: Record<string, Widget>;
  };
  dashboard: {
    meta: DashboardMetaData[];
    dashboards: Record<
      string,
      {
        isLoading: boolean;
        dashboard?: Dashboard;
      }
    >;
  };
};

/* Actions */

interface AppStartAction {
  type: typeof APP_START;
  payload: { projectId: string; masterKey: string };
}

export interface AddWidgetAction {
  type: typeof ADD_WIDGET;
  payload: { dashboardId: string; widgetId: string; position: GridPosition };
}

export interface UpdateWidgetsPositionAction {
  type: typeof UPDATE_WIDGETS_POSITION;
  payload: { widgets: Record<string, GridPosition> };
}

interface GetDashboardsAction {
  type: typeof GET_DASHBOARDS;
}

interface GetDashboardsSuccessAction {
  type: typeof GET_DASHBOARDS_SUCCESS;
  payload: { dashboards: DashboardMetaData[] };
}

interface GetDashboardsFailureAction {
  type: typeof GET_DASHBOARDS_FAILURE;
}

export interface GetDashboardByIdAction {
  type: typeof GET_DASHBOARD_BY_ID;
  payload: { id: string };
}

interface GetDashboardByIdSuccessAction {
  type: typeof GET_DASHBOARD_BY_ID_SUCCESS;
  payload: { id: string; dashboard: Dashboard };
}

interface GetDashboardByIdFailureAction {
  type: typeof GET_DASHBOARD_BY_ID_FAILURE;
}

export interface CreateDashboardAction {
  type: typeof CREATE_DASHBOARD;
}

interface CreateDashboardSuccessAction {
  type: typeof CREATE_DASHBOARD_SUCCESS;
  payload: { id: string; dashboard: Dashboard };
}

interface CreateDashboardFailureAction {
  type: typeof CREATE_DASHBOARD_FAILURE;
}

export interface DeleteDashboardAction {
  type: typeof DELETE_DASHBOARD;
  payload: { id: string };
}

interface DeleteDashboardSuccessAction {
  type: typeof DELETE_DASHBOARD_SUCCESS;
  payload: { id: string };
}

interface DeleteDashboardFailureAction {
  type: typeof DELETE_DASHBOARD_FAILURE;
}

export interface SaveDashboardAction {
  type: typeof SAVE_DASHBOARD;
  payload: { id: string };
}

interface SaveDashboardSuccessAction {
  type: typeof SAVE_DASHBOARD_SUCCESS;
  payload: { id: string };
}

interface SaveDashboardFailureAction {
  type: typeof SAVE_DASHBOARD_FAILURE;
}

export interface SetWidgets {
  type: typeof SET_WIDGETS;
  payload: { widgets: Record<string, Widget> };
}

export type ActionTypes =
  | AppStartAction
  | SetWidgets
  | UpdateWidgetsPositionAction
  | AddWidgetAction
  | DeleteDashboardAction
  | DeleteDashboardSuccessAction
  | DeleteDashboardFailureAction
  | GetDashboardsAction
  | GetDashboardsSuccessAction
  | GetDashboardsFailureAction
  | GetDashboardByIdAction
  | GetDashboardByIdSuccessAction
  | GetDashboardByIdFailureAction
  | CreateDashboardAction
  | CreateDashboardSuccessAction
  | CreateDashboardFailureAction
  | SaveDashboardAction
  | SaveDashboardSuccessAction
  | SaveDashboardFailureAction;
