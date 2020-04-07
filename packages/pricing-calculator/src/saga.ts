import { all, select, put, takeLatest } from 'redux-saga/effects';

import { plansConfig } from './plans-config';
import { setRecommendation, getCurrentPlan, Plans } from './recommendation';
import { getCalculatorState } from './calculator';

import { calculateCost } from './utils';

import {
  UPDATE_EVENTS,
  UPDATE_QUERIES,
  UPDATE_SERVICE,
  PLAN_TOPOLOGY,
} from './constants';

function* updateRecommendation() {
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

  const calculatedPlans = PLAN_TOPOLOGY.map((name: Plans) =>
    calculateCost({
      planId: name,
      s3Streaming: services.s3Streaming,
      events,
      queries,
    })
  );

  const upgradeIndex = PLAN_TOPOLOGY.indexOf(currentPlan) + 1;
  const nextPlan = PLAN_TOPOLOGY[upgradeIndex] as Plans;

  const shouldUpgrade =
    nextPlan && currentCost.total > plansConfig[nextPlan].priceTreshold;

  const downgradeIndex = PLAN_TOPOLOGY.indexOf(currentPlan) - 1;
  const previousPlan = PLAN_TOPOLOGY[downgradeIndex] as Plans;

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

export function* rootSaga() {
  yield all([
    takeLatest(
      [UPDATE_EVENTS, UPDATE_QUERIES, UPDATE_SERVICE],
      updateRecommendation
    ),
  ]);
}
