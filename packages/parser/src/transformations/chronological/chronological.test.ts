import { transformChronological } from './chronological';

const result = [
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

test('transform chronological results', () => {
  expect(transformChronological({ result })).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "keen.key": "2019-01-01T00:00:00.000Z",
          "keen.value": 100,
        },
        Object {
          "keen.key": "2020-01-01T00:00:00.000Z",
          "keen.value": 300,
        },
      ],
      "keys": Array [
        "keen.value",
      ],
    }
  `);
});
