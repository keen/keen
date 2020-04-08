import { Action } from 'redux';
import { calculatorReducer, initialState } from './reducer';

import { updateService, updateQueries, updateEvents } from './actions';

describe('@keen.io/pricing-calculator - calculatorReducer()', () => {
  it('should return initial state', () => {
    const state = calculatorReducer(initialState, {} as Action);

    expect(state).toEqual(initialState);
  });

  it('should set number of events', () => {
    const eventsAmount = 500;
    const action = updateEvents(eventsAmount);
    const { events } = calculatorReducer(initialState, action);

    expect(events).toEqual(eventsAmount);
  });

  it('should set number of queries', () => {
    const queriesAmount = 15000;
    const action = updateQueries(queriesAmount);
    const { queries } = calculatorReducer(initialState, action);

    expect(queries).toEqual(queriesAmount);
  });

  it('should set single service state', () => {
    const action = updateService('s3Streaming', true);
    const { services } = calculatorReducer(initialState, action);

    expect(services).toMatchInlineSnapshot(`
      Object {
        "customSSL": false,
        "rbac": false,
        "s3Streaming": true,
      }
    `);
  });
});
