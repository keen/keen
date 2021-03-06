import { transformCategoricalChronological } from './categorical-chronological';

import { IntervalResult } from '../../types';

test('transform categorical results in chronological order', () => {
  const result: IntervalResult[] = [
    {
      value: [
        {
          author: 'Edwidge Danticat',
          result: 95,
          name: 'Love, Anger, Madness',
        },
        { author: 'George R. R. Martin', result: 719, name: 'Game of Thrones' },
      ],
      timeframe: {
        start: '2020-01-01T00:00:00.000Z',
        end: '2020-02-01T00:00:00.000Z',
      },
    },
    {
      value: [
        { author: 'Edwidge Danticat', result: 2, name: 'Love, Anger, Madness' },
        { author: 'George R. R. Martin', result: 11, name: 'Game of Thrones' },
        { author: 'J.K. Rowling', result: 1, name: 'Harry Potter' },
      ],
      timeframe: {
        start: '2020-02-01T00:00:00.000Z',
        end: '2020-02-01T16:00:00.000Z',
      },
    },
  ];

  expect(
    transformCategoricalChronological(
      { result },
      {
        transformation: 'categorical-chronological',
        fillEmptyIntervalsKeys: false,
        mergePropertiesOrder: null,
      }
    )
  ).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "Edwidge Danticat | Love, Anger, Madness": 95,
          "George R. R. Martin | Game of Thrones": 719,
          "keen.key": "2020-01-01T00:00:00.000Z",
        },
        Object {
          "Edwidge Danticat | Love, Anger, Madness": 2,
          "George R. R. Martin | Game of Thrones": 11,
          "J.K. Rowling | Harry Potter": 1,
          "keen.key": "2020-02-01T00:00:00.000Z",
        },
      ],
      "keys": Array [
        "Edwidge Danticat | Love, Anger, Madness",
        "George R. R. Martin | Game of Thrones",
        "J.K. Rowling | Harry Potter",
      ],
    }
  `);
});

test('transform categorical results and fill missing interval data series', () => {
  const result: IntervalResult[] = [
    {
      value: [
        { author: 'George R. R. Martin', result: 719, name: 'Game of Thrones' },
      ],
      timeframe: {
        start: '2020-01-01T00:00:00.000Z',
        end: '2020-02-01T00:00:00.000Z',
      },
    },
    {
      value: [{ author: 'J.K. Rowling', result: 1, name: 'Harry Potter' }],
      timeframe: {
        start: '2020-02-01T00:00:00.000Z',
        end: '2020-02-01T16:00:00.000Z',
      },
    },
  ];

  expect(
    transformCategoricalChronological(
      { result },
      {
        transformation: 'categorical-chronological',
        fillEmptyIntervalsKeys: true,
        mergePropertiesOrder: null,
      }
    )
  ).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "George R. R. Martin | Game of Thrones": 719,
          "J.K. Rowling | Harry Potter": 0,
          "keen.key": "2020-01-01T00:00:00.000Z",
        },
        Object {
          "George R. R. Martin | Game of Thrones": 0,
          "J.K. Rowling | Harry Potter": 1,
          "keen.key": "2020-02-01T00:00:00.000Z",
        },
      ],
      "keys": Array [
        "George R. R. Martin | Game of Thrones",
        "J.K. Rowling | Harry Potter",
      ],
    }
  `);
});

test('transform categorical results and merge properties in provided order', () => {
  const result: IntervalResult[] = [
    {
      value: [{ city: 'New York', result: 400, country: 'USA' }],
      timeframe: {
        start: '2020-01-01T00:00:00.000Z',
        end: '2020-02-01T00:00:00.000Z',
      },
    },
    {
      value: [{ city: 'Berlin', result: 200, country: 'Germany' }],
      timeframe: {
        start: '2020-02-01T00:00:00.000Z',
        end: '2020-02-01T16:00:00.000Z',
      },
    },
  ];

  expect(
    transformCategoricalChronological(
      { result },
      {
        transformation: 'categorical-chronological',
        fillEmptyIntervalsKeys: false,
        mergePropertiesOrder: ['country', 'city'],
      }
    )
  ).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "USA | New York": 400,
          "keen.key": "2020-01-01T00:00:00.000Z",
        },
        Object {
          "Germany | Berlin": 200,
          "keen.key": "2020-02-01T00:00:00.000Z",
        },
      ],
      "keys": Array [
        "USA | New York",
        "Germany | Berlin",
      ],
    }
  `);
});

test('transform categorical results in "Europe/Warsaw (+01:00)" named timezone', () => {
  const result: IntervalResult[] = [
    {
      value: [
        {
          author: 'Edwidge Danticat',
          result: 95,
          name: 'Love, Anger, Madness',
        },
        { author: 'George R. R. Martin', result: 719, name: 'Game of Thrones' },
      ],
      timeframe: {
        start: '2019-12-31T23:00:00.000Z',
        end: '2019-12-31T23:00:00.000Z',
      },
    },
  ];

  expect(
    transformCategoricalChronological(
      { result },
      {
        transformation: 'categorical-chronological',
        fillEmptyIntervalsKeys: false,
        mergePropertiesOrder: null,
        dateModifier: 'Europe/Warsaw',
      }
    )
  ).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "Edwidge Danticat | Love, Anger, Madness": 95,
          "George R. R. Martin | Game of Thrones": 719,
          "keen.key": "2020-01-01T00:00:00.000Z",
        },
      ],
      "keys": Array [
        "Edwidge Danticat | Love, Anger, Madness",
        "George R. R. Martin | Game of Thrones",
      ],
    }
  `);
});

test('transform categorical results by offset in minutes', () => {
  const result: IntervalResult[] = [
    {
      value: [
        {
          author: 'Edwidge Danticat',
          result: 95,
          name: 'Love, Anger, Madness',
        },
        { author: 'George R. R. Martin', result: 719, name: 'Game of Thrones' },
      ],
      timeframe: {
        start: '2019-01-01T01:00:00.000Z',
        end: '2019-01-01T00:01:00.000Z',
      },
    },
  ];

  expect(
    transformCategoricalChronological(
      { result },
      {
        transformation: 'categorical-chronological',
        fillEmptyIntervalsKeys: false,
        mergePropertiesOrder: null,
        dateModifier: -60,
      }
    )
  ).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "Edwidge Danticat | Love, Anger, Madness": 95,
          "George R. R. Martin | Game of Thrones": 719,
          "keen.key": "2019-01-01T00:00:00.000Z",
        },
      ],
      "keys": Array [
        "Edwidge Danticat | Love, Anger, Madness",
        "George R. R. Martin | Game of Thrones",
      ],
    }
  `);
});

test('all keys should be strings', () => {
  const result: IntervalResult[] = [
    {
      value: [
        {
          author: 200,
          result: 95,
        },
        { author: 400, result: 719 },
      ],
      timeframe: {
        start: '2019-01-01T01:00:00.000Z',
        end: '2019-01-01T00:01:00.000Z',
      },
    },
  ];

  const { data, keys } = transformCategoricalChronological(
    { result },
    {
      transformation: 'categorical-chronological',
      fillEmptyIntervalsKeys: false,
      mergePropertiesOrder: null,
      dateModifier: -60,
    }
  );

  const dataKeys = [];

  for (const property in data[0]) {
    dataKeys.push(property);
  }

  expect(keys.every((key) => typeof key === 'string')).toBeTruthy();
  expect(dataKeys.every((key) => typeof key === 'string')).toBeTruthy();
});

test('transform categorical results with "null" values', () => {
  const result: IntervalResult[] = [
    {
      value: [
        { 'geo_information.continent': 'Oceania', result: 0 },
        { 'geo_information.continent': 'South America', result: 0 },
        { 'geo_information.continent': null, result: 0 },
      ],
      timeframe: {
        start: '2019-01-01T00:00:00.000Z',
        end: '2019-01-01T00:00:00.000Z',
      },
    },
  ];

  expect(
    transformCategoricalChronological(
      { result },
      {
        transformation: 'categorical-chronological',
        fillEmptyIntervalsKeys: false,
        mergePropertiesOrder: null,
        dateModifier: null,
      }
    )
  ).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "Oceania": 0,
          "South America": 0,
          "keen.key": "2019-01-01T00:00:00.000Z",
          "null": 0,
        },
      ],
      "keys": Array [
        "Oceania",
        "South America",
        "null",
      ],
    }
  `);
});
