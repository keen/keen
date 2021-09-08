import { tableChartTransformation } from './table-transformation';

test('transforms chronological results for table', () => {
  const chronologicalResults = [
    {
      value: 100,
      timeframe: {
        start: '2019-01-01T00:00:00.000Z',
        end: '2020-01-01T00:00:00.000Z',
      },
    },
    {
      value: 300,
      timeframe: {
        start: '2020-01-01T00:00:00.000Z',
        end: '2021-01-01T00:00:00.000Z',
      },
    },
  ];

  expect(
    tableChartTransformation(
      { analysis_type: 'count', event_collection: 'page_views' },
      chronologicalResults,
      null
    )
  ).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "count.page_views": 100,
          "interval": "2019-01-01T00:00:00.000Z",
        },
        Object {
          "count.page_views": 300,
          "interval": "2020-01-01T00:00:00.000Z",
        },
      ],
      "keys": Array [
        "count.page_views",
      ],
    }
  `);
});
