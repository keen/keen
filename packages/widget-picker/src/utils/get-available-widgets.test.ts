import { getAvailableWidgets } from './get-available-widgets';

test('returns widgets for extraction', () => {
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

test('returns widgets for funnel', () => {
  const query: Record<string, any> = {
    analysis_type: 'funnel',
    event_collection: 'Clicks',
    timeframe: 'this_14_days',
  };

  const result = getAvailableWidgets(query);
  expect(result).toMatchInlineSnapshot(`
    Array [
      "funnel",
      "table",
      "json",
      "bar",
    ]
  `);
});

test('returns widgets for interval', () => {
  const query: Record<string, any> = {
    analysis_type: 'count',
    event_collection: 'Clicks',
    timeframe: 'this_14_days',
    interval: 'daily',
  };

  const result = getAvailableWidgets(query);
  expect(result).toMatchInlineSnapshot(`
    Array [
      "line",
      "table",
      "json",
      "metric",
      "bar",
      "area",
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
      "bar",
      "table",
      "json",
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
      "metric",
      "table",
      "json",
    ]
  `);
});
