/* eslint-disable @typescript-eslint/camelcase */
import { getAvailableWidgets } from './get-available-widgets';

test('return widgets for extraction', () => {
  const query: Record<string, any> = {
    analysis_type: 'extraction',
    event_collection: 'Clicks',
    timeframe: 'this_14_days',
  };

  const result = getAvailableWidgets(query);
  expect(result).toMatchInlineSnapshot(`
    Array [
      "table",
      "json",
    ]
  `);
});

test('return widgets for funnel', () => {
  const query: Record<string, any> = {
    analysis_type: 'funnel',
    event_collection: 'Clicks',
    timeframe: 'this_14_days',
  };

  const result = getAvailableWidgets(query);
  expect(result).toMatchInlineSnapshot(`
    Array [
      "table",
      "json",
      "bar",
      "area",
      "line",
      "funnel",
      "table",
    ]
  `);
});

test('return widgets for interval', () => {
  const query: Record<string, any> = {
    analysis_type: 'count',
    event_collection: 'Clicks',
    timeframe: 'this_14_days',
    interval: 'daily',
  };

  const result = getAvailableWidgets(query);
  expect(result).toMatchInlineSnapshot(`
    Array [
      "table",
      "json",
      "bar",
      "area",
      "line",
      "heatmap",
    ]
  `);
});

test('returns widgets for groupBy', () => {
  const query: Record<string, any> = {
    analysis_type: 'count',
    event_collection: 'Clicks',
    timeframe: 'this_14_days',
    group_by: ['country'],
  };

  const result = getAvailableWidgets(query);
  expect(result).toMatchInlineSnapshot(`
    Array [
      "table",
      "json",
      "bar",
      "pie",
      "donut",
      "heatmap",
      "choropleth",
    ]
  `);
});
test('fallbacks to default widgets', () => {
  const query: Record<string, any> = {
    analysis_type: 'count',
    event_collection: 'Clicks',
    timeframe: 'this_14_days',
  };

  const result = getAvailableWidgets(query);
  expect(result).toMatchInlineSnapshot(`
    Array [
      "table",
      "json",
    ]
  `);
});
