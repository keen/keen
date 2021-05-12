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
          "Interval": "2019-01-01T00:00:00.000Z",
          "count.page_views": 100,
        },
        Object {
          "Interval": "2020-01-01T00:00:00.000Z",
          "count.page_views": 300,
        },
      ],
      "keys": Array [
        "count.page_views",
      ],
    }
  `);
});
