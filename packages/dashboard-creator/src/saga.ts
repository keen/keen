import {
  all,
  put,
  call,
  select,
  getContext,
  takeLatest,
} from 'redux-saga/effects';

import API from './api';
import {
  setWidgets,
  getDashboards,
  getDashboardsSuccess,
  getDashboardsFailure,
  getDashboardByIdSuccess,
  getDashboardByIdFailure,
  deleteDashboardSuccess,
  deleteDashboardFailure,
  createDashboardSuccess,
  createDashboardFailure,
  saveDashboardSuccess,
  saveDashboardFailure,
} from './actions';

import { getDashboard, getWidget } from './selectors';
import { generateId } from './utils';

import {
  APP_START,
  CREATE_DASHBOARD,
  CREATE_DASHBOARD_SUCCESS,
  DELETE_DASHBOARD,
  GET_DASHBOARDS,
  GET_DASHBOARD_BY_ID,
  SAVE_DASHBOARD,
  DASHBOARD_VERSION,
} from './constants';

import {
  GetDashboardByIdAction,
  SaveDashboardAction,
  DeleteDashboardAction,
  Widget,
  Dashboard,
} from './types';

function* createDashboard() {
  const api: API = yield getContext('api');
  const dashboardId = generateId();

  const dashboard: Dashboard = {
    id: dashboardId,
    version: DASHBOARD_VERSION,
    widgets: [],
  };

  try {
    yield call(api.saveDashboard, dashboardId, dashboard);
    yield put(createDashboardSuccess(dashboardId, dashboard));
  } catch (err) {
    yield put(createDashboardFailure());
  }
}

function* saveDashboard(action: SaveDashboardAction) {
  const {
    payload: { id },
  } = action;

  const api: API = yield getContext('api');

  const state = yield select();
  const { dashboard } = yield getDashboard(state, id);

  const dashboardModel = {
    ...dashboard,
    widgets: dashboard.widgets.map((id: string) => getWidget(state, id)),
  };

  try {
    yield call(api.saveDashboard, id, dashboardModel);
    yield put(saveDashboardSuccess(id));
  } catch (err) {
    yield put(saveDashboardFailure());
  }
}

function* deleteDashboard(action: DeleteDashboardAction) {
  const {
    payload: { id },
  } = action;
  const api: API = yield getContext('api');
  try {
    yield call(api.deleteDashboard, id);
    yield put(deleteDashboardSuccess(id));
  } catch (err) {
    yield put(deleteDashboardFailure());
  }
}

function* fetchDashboards() {
  const api: API = yield getContext('api');
  try {
    const dashboards = yield call(api.getDashboards);
    yield put(getDashboardsSuccess(dashboards));
  } catch (err) {
    yield put(getDashboardsFailure());
  }
}

function* fetchDashboardById(action: GetDashboardByIdAction) {
  const {
    payload: { id },
  } = action;
  const api: API = yield getContext('api');

  try {
    const { widgets, ...rest }: Dashboard & { widgets: Widget[] } = yield call(
      api.getDashboardById,
      id
    );
    const dashboardWidgets: Record<string, Widget> = {};

    widgets.forEach((widget: Widget) => {
      dashboardWidgets[widget.id] = widget;
    });

    yield put(setWidgets(dashboardWidgets));

    const dashboardModel = {
      ...rest,
      widgets: widgets.map(({ id }: Widget) => id),
    };
    yield put(getDashboardByIdSuccess(id, dashboardModel));
  } catch (err) {
    yield put(getDashboardByIdFailure());
  }
}

function* appStart() {
  yield put(getDashboards());
}

export function* rootSaga() {
  yield all([
    takeLatest(APP_START, appStart),
    takeLatest(CREATE_DASHBOARD_SUCCESS, fetchDashboards),
    takeLatest(CREATE_DASHBOARD, createDashboard),
    takeLatest(SAVE_DASHBOARD, saveDashboard),
    takeLatest(DELETE_DASHBOARD, deleteDashboard),
    takeLatest(GET_DASHBOARDS, fetchDashboards),
    takeLatest(GET_DASHBOARD_BY_ID, fetchDashboardById),
  ]);
}
