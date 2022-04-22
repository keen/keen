import { Query } from '@keen.io/query';

import DataParser from './DataParser';

describe('createSettingsFromQuery ', () => {
  test('specifies merge properties order', () => {
    const query: Query = {
      analysis_type: 'count',
      event_collection: 'pageviews',
      timeframe: 'last_7_days',
      group_by: ['country', 'url'],
    };

    const { mergePropertiesOrder } = DataParser.createSettingsFromQuery({
      query,
    });

    expect(mergePropertiesOrder).toEqual(['country', 'url']);
  });

  test('enables fill empty interval keys', () => {
    const query: Query = {
      analysis_type: 'count',
      event_collection: 'pageviews',
      timeframe: 'last_7_days',
      interval: 'daily',
      order_by: 'results',
      group_by: ['country', 'url'],
      limit: 5,
    };

    const { fillEmptyIntervalsKeys } = DataParser.createSettingsFromQuery({
      query,
    });

    expect(fillEmptyIntervalsKeys).toEqual(true);
  });
});
