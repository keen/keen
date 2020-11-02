import { validateOptions, setChartSettings } from './visualizer.utils';

describe('@keen.io/dataviz - utils', () => {
  describe('validateOptions()', () => {
    it('should throw error for missing "type" property', () => {
      expect(() =>
        validateOptions({ container: '#chart' } as any)
      ).toThrowErrorMatchingInlineSnapshot(
        `"@keen.io/dataviz - type property is required"`
      );
    });

    it('should throw error for missing "container" property', () => {
      expect(() =>
        validateOptions({ type: 'bar' } as any)
      ).toThrowErrorMatchingInlineSnapshot(
        `"@keen.io/dataviz - container property is required"`
      );
    });

    it('should throw error about invalid "container" property type', () => {
      expect(() =>
        validateOptions({ type: 'bar', container: 20 } as any)
      ).toThrowErrorMatchingInlineSnapshot(
        `"@keen.io/dataviz - container property must be instance of HTMLElement or DOM Element selector"`
      );
    });

    it('should not throw error for HTMLElement reference', () => {
      const container = document.createElement('div');

      expect(() => validateOptions({ type: 'pie', container })).not.toThrow();
    });
  });

  describe('setChartSettings()', () => {
    const input = {
      query: {
        analysis_type: 'extraction',
        event_collection: 'book_purchase',
        timeframe: {
          start: '2020-02-01T00:00:00.000-00:00',
          end: '2020-02-01T01:00:00.000-00:00',
        },
        timezone: 3600,
      },
      result: [
        {
          keen: {
            timestamp: '2020-02-01T00:59:11.139Z',
            created_at: '2020-02-11T13:05:19.488Z',
            id: '5e42a68f65bee800011151b2',
          },
          name: 'Game of Thrones',
          author: 'George R. R. Martin',
        },
        {
          keen: {
            timestamp: '2020-02-01T00:19:04.226Z',
            created_at: '2020-02-11T13:09:47.218Z',
            id: '5e42a79be1d87500016d95d5',
          },
          name: 'Game of Thrones',
          author: 'George R. R. Martin',
        },
        {
          keen: {
            timestamp: '2020-02-01T00:26:09.048Z',
            created_at: '2020-02-11T13:09:49.290Z',
            id: '5e42a79d5079e4000146249d',
          },
          name: 'Game of Thrones',
          author: 'George R. R. Martin',
        },
        {
          keen: {
            timestamp: '2020-02-01T00:50:09.137Z',
            created_at: '2020-02-11T13:09:50.445Z',
            id: '5e42a79eb62d31000105a0c9',
          },
          name: 'Game of Thrones',
          author: 'George R. R. Martin',
        },
        {
          keen: {
            timestamp: '2020-02-01T00:11:31.186Z',
            created_at: '2020-02-11T13:10:17.588Z',
            id: '5e42a7b9af78b100018141ea',
          },
          name: 'It',
          author: 'Stephen King',
        },
        {
          keen: {
            timestamp: '2020-02-01T00:58:08.226Z',
            created_at: '2020-02-11T13:10:20.410Z',
            id: '5e42a7bc1089d40001711efe',
          },
          name: 'It',
          author: 'Stephen King',
        },
        {
          keen: {
            timestamp: '2020-02-01T00:13:20.198Z',
            created_at: '2020-02-11T13:11:33.077Z',
            id: '5e42a8051089d40001712385',
          },
          name: 'It',
          author: 'Stephen King',
        },
        {
          keen: {
            timestamp: '2020-02-01T00:46:40.859Z',
            created_at: '2020-02-11T13:11:34.280Z',
            id: '5e42a8069e67ff00012f083b',
          },
          name: 'It',
          author: 'Stephen King',
        },
      ],
    };
    it('should return empty object for JSON', () => {
      expect(setChartSettings(input, 'json')).toEqual({});
    });
    it('should return empty object for table', () => {
      expect(setChartSettings(input, 'table')).toEqual({});
    });
    it('should return columnsOrder for table', () => {
      const propertyNames = ['author', 'name'];
      const orderedInput = {
        ...input,
        query: { ...input.query, property_names: propertyNames },
      };

      const chartSettings = setChartSettings(orderedInput, 'table');
      chartSettings.columnsOrder.forEach((item, idx) => {
        expect(item).toEqual(propertyNames[idx]);
      });
    });
  });
});
