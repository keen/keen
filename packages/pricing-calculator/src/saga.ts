import { all, select, put, call, take, takeLatest } from 'redux-saga/effects';
import { eventChannel, EventChannel, END } from 'redux-saga';

import { plansConfig } from './plans-config';
import { setRecommendation, getCurrentPlan } from './recommendation';
import { getCalculatorState } from './calculator';
import { getDevice, setDevice } from './app';

import { calculateCost, getBrowserWidth } from './utils';

import {
  APP_START,
  UPDATE_EVENTS,
  UPDATE_QUERIES,
  UPDATE_SERVICE,
  PLAN_TOPOLOGY,
  LAYOUT_BREAKPOINT,
} from './constants';

import { PlanId, Device } from './types';

const resizeChannel = () =>
  eventChannel(emitter => {
    const eventHandler = () => {
      const width = getBrowserWidth();
      emitter(width);
    };

    window.addEventListener('resize', eventHandler);

    return () => {
      emitter(END);
      window.removeEventListener('resize', eventHandler);
    };
  });

export function* updateRecommendation() {
  const state = yield select();
  const currentPlan = getCurrentPlan(state);
  const { events, queries, services } = getCalculatorState(state);

  const currentTreshold = plansConfig[currentPlan].priceTreshold;
  const currentCost = calculateCost({
    planId: currentPlan,
    s3Streaming: services.s3Streaming,
    events,
    queries,
  });

  if (services.customSSL || services.rbac) {
    yield put(setRecommendation('custom'));
    return;
  }

  const calculatedPlans = PLAN_TOPOLOGY.map((name: PlanId) =>
    calculateCost({
      planId: name,
      s3Streaming: services.s3Streaming,
      events,
      queries,
    })
  );

  const upgradeIndex = PLAN_TOPOLOGY.indexOf(currentPlan) + 1;
  const nextPlan = PLAN_TOPOLOGY[upgradeIndex] as PlanId;

  const shouldUpgrade =
    nextPlan && currentCost.total > plansConfig[nextPlan].priceTreshold;

  const downgradeIndex = PLAN_TOPOLOGY.indexOf(currentPlan) - 1;
  const previousPlan = PLAN_TOPOLOGY[downgradeIndex] as PlanId;

  const previousPlanCost = calculatedPlans.find(
    ({ plan }) => plan === previousPlan
  );

  const shouldDowngrade =
    previousPlanCost && previousPlanCost.total < currentTreshold;

  if (shouldDowngrade) {
    yield put(setRecommendation(previousPlan));
  }

  if (shouldUpgrade) {
    yield put(setRecommendation(nextPlan));
  }
}

export function* watchWindowResize() {
  const width = getBrowserWidth();
  yield put(setDevice(width > LAYOUT_BREAKPOINT ? 'desktop' : 'mobile'));

  const channel: EventChannel<number> = yield call(resizeChannel);
  try {
    while (true) {
      const windowWidth = yield take(channel);
      const device: Device =
        windowWidth > LAYOUT_BREAKPOINT ? 'desktop' : 'mobile';
      const currentDevice = yield select(getDevice);
      if (currentDevice !== device) yield put(setDevice(device));
    }
  } catch (err) {
    console.error(err);
  }
}

export function* rootSaga() {
  yield all([
    takeLatest(APP_START, watchWindowResize),
    takeLatest(
      [UPDATE_EVENTS, UPDATE_QUERIES, UPDATE_SERVICE],
      updateRecommendation
    ),
  ]);
}
