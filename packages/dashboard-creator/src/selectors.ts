import { AppState } from './types';

export const getDashboard = (state: AppState, id: string) =>
  state.dashboard.dashboards?.[id];

export const getDashboardsMeta = (state: AppState) => state.dashboard.meta;

export const getWidget = (state: AppState, id: string) =>
  state.widget.widgets[id];

export const getWidgetsPosition = (state: AppState, widgetsId: string[]) =>
  widgetsId.map((id: string) => ({
    id,
    position: state.widget.widgets[id].position,
  }));
