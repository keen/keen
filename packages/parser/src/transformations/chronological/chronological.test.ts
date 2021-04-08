import { transformChronological } from './chronological';

import { ParserSettings } from '../../types';

test('transforms chronological results without date conversion', () => {
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
    transformChronological(
      { result: chronologicalResults },
      {} as ParserSettings
    )
  ).toMatchInlineSnapshot(`
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

test('transforms chronological results by offset in minutes', () => {
  const result = [
    {
      value: 0,
      timeframe: {
        start: '2021-03-19T21:00:00.000Z',
        end: '2021-03-20T21:00:00.000Z',
      },
    },
    {
      value: 0,
      timeframe: {
        start: '2021-03-20T21:00:00.000Z',
        end: '2021-03-21T21:00:00.000Z',
      },
    },
  ];

  expect(
    transformChronological({ result }, { dateModifier: 180 } as ParserSettings)
  ).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "keen.key": "2021-03-20T00:00:00.000Z",
          "keen.value": 0,
        },
        Object {
          "keen.key": "2021-03-21T00:00:00.000Z",
          "keen.value": 0,
        },
      ],
      "keys": Array [
        "keen.value",
      ],
    }
  `);
});

test('transforms chronological results in "Africa/Nairobi (+03:00)" named timezone', () => {
  const result = [
    {
      value: 0,
      timeframe: {
        start: '2021-03-19T21:00:00.000Z',
        end: '2021-03-20T21:00:00.000Z',
      },
    },
    {
      value: 0,
      timeframe: {
        start: '2021-03-20T21:00:00.000Z',
        end: '2021-03-21T21:00:00.000Z',
      },
    },
  ];

  expect(
    transformChronological({ result }, {
      dateModifier: 'Africa/Nairobi',
    } as ParserSettings)
  ).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "keen.key": "2021-03-20T00:00:00.000Z",
          "keen.value": 0,
        },
        Object {
          "keen.key": "2021-03-21T00:00:00.000Z",
          "keen.value": 0,
        },
      ],
      "keys": Array [
        "keen.value",
      ],
    }
  `);
});

test('all keys should be strings', () => {
  const result = [
    {
      value: 0,
      timeframe: {
        start: '2021-03-19T21:00:00.000Z',
        end: '2021-03-20T21:00:00.000Z',
      },
    },
    {
      value: 0,
      timeframe: {
        start: '2021-03-20T21:00:00.000Z',
        end: '2021-03-21T21:00:00.000Z',
      },
    },
  ];

  const keys = transformChronological({ result }, {
    dateModifier: 'Africa/Nairobi',
  } as ParserSettings).keys;

  expect(keys.every((key) => typeof key === 'string')).toBeTruthy();
});
