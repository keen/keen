import 'isomorphic-fetch';
import { all, put, takeLatest } from 'redux-saga/effects';

import { getDashboards } from './actions';

import { APP_START, GET_DASHBOARDS } from './constants';

function* fetchDashboards() {
  fetch(
    'https://blob-service.us-west-2.test.aws.keen.io/projects/5de6365c46e0fb00016563bc/metadata/dashboard',
    {
      headers: {
        Authorization:
          'F3BC52F83A0FF361B441505739966A40FA6DF0A62D2912B005ACD6FDAB3B186C',
      },
    }
  );
}

function* appStart() {
  yield put(getDashboards());
}

export function* rootSaga() {
  yield all([
    takeLatest(APP_START, appStart),
    takeLatest(GET_DASHBOARDS, fetchDashboards),
  ]);
}
