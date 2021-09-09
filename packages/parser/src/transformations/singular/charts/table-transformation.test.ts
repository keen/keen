import { tableChartTransformation } from './table-transformation';

test('transform singular result for table', () => {
  const result = tableChartTransformation(
    {
      analysis_type: 'count',
      event_collection: 'page_views',
    },
    120
  );

  expect(result).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "analysis": "count.page_views",
          "value": 120,
        },
      ],
      "keys": Array [
        "value",
      ],
    }
  `);
});
