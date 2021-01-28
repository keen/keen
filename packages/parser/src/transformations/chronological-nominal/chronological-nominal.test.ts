import { transformChronologicalNominal } from './chronological-nominal';

test('transform nominal results in chronological order', () => {
  const result = [
    {
      value: ['Dr.', 'Miss', 'Mr.', 'Mrs.', 'Ms.'],
      timeframe: {
        start: '2020-01-01T00:00:00.000Z',
        end: '2021-01-01T00:00:00.000Z',
      },
    },
    {
      value: [],
      timeframe: {
        start: '2021-01-01T00:00:00.000Z',
        end: '2022-01-01T00:00:00.000Z',
      },
    },
  ];

  expect(transformChronologicalNominal({ result })).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "keen.key": "2020-01-01T00:00:00.000Z",
          "keen.value": Array [
            "Dr.",
            "Miss",
            "Mr.",
            "Mrs.",
            "Ms.",
          ],
        },
        Object {
          "keen.key": "2021-01-01T00:00:00.000Z",
          "keen.value": Array [],
        },
      ],
      "keys": Array [
        "keen.value",
      ],
    }
  `);
});
