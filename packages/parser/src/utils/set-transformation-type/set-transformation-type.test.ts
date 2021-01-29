import { Query, Step } from '@keen.io/query';

import { setTransformationType } from './set-transformation-type';

test('set "singular" transformation type ', () => {
  const query: Query = {
    analysis_type: 'count',
    event_collection: 'book_purchase',
    timeframe: 'this_14_days',
  };
  const transformation = setTransformationType(query);

  expect(transformation).toEqual('singular');
});

test('set "nominal" transformation type ', () => {
  const query: Query = {
    analysis_type: 'select_unique',
    target_property: 'name',
    event_collection: 'logins',
    timeframe: 'this_14_days',
  };
  const transformation = setTransformationType(query);

  expect(transformation).toEqual('nominal');
});

test('set "chronological-nominal" transformation type ', () => {
  const query: Query = {
    analysis_type: 'select_unique',
    target_property: 'name',
    event_collection: 'logins',
    timeframe: 'this_14_days',
    interval: 'daily',
  };
  const transformation = setTransformationType(query);

  expect(transformation).toEqual('chronological-nominal');
});

test('set "categorical-nominal" transformation type ', () => {
  const query: Query = {
    analysis_type: 'select_unique',
    target_property: 'name',
    event_collection: 'logins',
    timeframe: 'this_14_days',
    group_by: ['country'],
  };
  const transformation = setTransformationType(query);

  expect(transformation).toEqual('categorical-nominal');
});

test('set "chronological-categorical-nominal" transformation type ', () => {
  const query: Query = {
    analysis_type: 'select_unique',
    target_property: 'name',
    event_collection: 'logins',
    timeframe: 'this_14_days',
    group_by: ['country'],
    interval: 'daily',
  };
  const transformation = setTransformationType(query);

  expect(transformation).toEqual('chronological-categorical-nominal');
});

test('set "categorical" transformation type ', () => {
  const query: Query = {
    analysis_type: 'count',
    event_collection: 'logins',
    group_by: ['country'],
  };
  const transformation = setTransformationType(query);

  expect(transformation).toEqual('categorical');
});

test('set "chronological" transformation type ', () => {
  const query: Query = {
    analysis_type: 'count',
    event_collection: 'purchases',
    interval: 'daily',
  };
  const transformation = setTransformationType(query);

  expect(transformation).toEqual('chronological');
});

test('set "categorical-chronological" transformation type ', () => {
  const query: Query = {
    analysis_type: 'count',
    event_collection: 'purchases',
    group_by: ['country'],
    interval: 'daily',
  };
  const transformation = setTransformationType(query);

  expect(transformation).toEqual('categorical-chronological');
});

test('set "funnel" transformation type ', () => {
  const steps: Step[] = [
    {
      with_actors: false,
      actor_property: 'user.uuid',
      timeframe: {
        start: '2019-03-13T00:00:00+00:00',
        end: '2019-08-14T00:00:00+00:00',
      },
      event_collection: 'pageviews',
      optional: false,
      inverted: false,
    },
  ];
  const transformation = setTransformationType(undefined, steps);

  expect(transformation).toEqual('funnel');
});

test('set "extraxtion" transformation type ', () => {
  const query: Query = {
    analysis_type: 'extraction',
    event_collection: 'purchases',
    interval: 'daily',
  };
  const transformation = setTransformationType(query);

  expect(transformation).toEqual('extraction');
});

test('set "null" as transformation type ', () => {
  const transformation = setTransformationType(undefined);

  expect(transformation).toEqual(null);
});
