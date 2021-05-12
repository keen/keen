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
          "Analysis": "count.page_views",
          "Value": 120,
        },
      ],
      "keys": Array [
        "Value",
      ],
    }
  `);
});
