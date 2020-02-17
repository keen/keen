import {
  ActionTypes,
  Dashboard,
  DashboardMetaData,
  AddWidgetAction,
} from '../types';

import {
  GET_DASHBOARDS_SUCCESS,
  GET_DASHBOARD_BY_ID,
  GET_DASHBOARD_BY_ID_SUCCESS,
  CREATE_DASHBOARD_SUCCESS,
  ADD_WIDGET,
} from '../constants';

type DashboardState = {
  isLoading: boolean;
  dashboard: Dashboard;
};

type ReducerState = {
  meta: DashboardMetaData[];
  dashboards: Record<string, DashboardState>;
};

const initialState: ReducerState = {
  meta: [],
  dashboards: {},
};

const reduceAddWidget = (state: ReducerState, action: AddWidgetAction) => {
  const { dashboardId, widgetId } = action.payload;
  return {
    ...state,
    dashboards: {
      ...state.dashboards,
      [dashboardId]: {
        ...state.dashboards[dashboardId],
        dashboard: {
          ...state.dashboards[dashboardId].dashboard,
          widgets: [
            ...state.dashboards[dashboardId].dashboard.widgets,
            widgetId,
          ],
        },
      },
    },
  };
};

export const dashboardReducer = (
  state: ReducerState = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case CREATE_DASHBOARD_SUCCESS:
      return {
        ...state,
        dashboards: {
          ...state.dashboards,
          [action.payload.id]: action.payload.dashboard,
        },
      };
    case ADD_WIDGET:
      return reduceAddWidget(state, action);
    case GET_DASHBOARDS_SUCCESS:
      return {
        ...state,
        meta: action.payload.dashboards,
      };
    case GET_DASHBOARD_BY_ID:
      return {
        ...state,
        dashboards: {
          ...state.dashboards,
          [action.payload.id]: {
            ...state.dashboards[action.payload.id],
            isLoading: true,
          },
        },
      };
    case GET_DASHBOARD_BY_ID_SUCCESS:
      return {
        ...state,
        dashboards: {
          ...state.dashboards,
          [action.payload.id]: {
            isLoading: false,
            dashboard: action.payload.dashboard,
          },
        },
      };
    default:
      return state;
  }
};
