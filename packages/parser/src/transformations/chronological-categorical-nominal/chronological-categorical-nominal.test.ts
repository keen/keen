import { transformChronologicalCategoricalNominal } from './chronological-categorical-nominal';

import { ParserSettings } from '../../types';

test('transform nominal results in chronological order', () => {
  const result = [
    {
      value: [
        { 'user.country': 'Afghanistan', result: [] },
        {
          'user.country': 'Albania',
          result: ['Dr.', 'Miss', 'Mr.', 'Mrs.', 'Ms.'],
        },
      ],
      timeframe: {
        start: '2019-01-01T00:00:00.000Z',
        end: '2020-01-01T00:00:00.000Z',
      },
    },
    {
      value: [
        {
          'user.country': 'Afghanistan',
          result: ['Dr.', 'Miss', 'Mr.', 'Mrs.', 'Ms.'],
        },
        {
          'user.country': 'Guernsey',
          result: ['Dr.', 'Mrs.', 'Ms.'],
        },
      ],
      timeframe: {
        start: '2020-01-01T00:00:00.000Z',
        end: '2021-01-01T00:00:00.000Z',
      },
    },
    {
      value: [
        { 'user.country': 'Afghanistan', result: [] },
        { 'user.country': 'Algeria', result: [] },
      ],
      timeframe: {
        start: '2021-01-01T00:00:00.000Z',
        end: '2022-01-01T00:00:00.000Z',
      },
    },
  ];

  expect(
    transformChronologicalCategoricalNominal({ result }, {} as ParserSettings)
  ).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "keen.key": "2019-01-01T00:00:00.000Z",
          "keen.value": Array [],
          "user.country": "Afghanistan",
        },
        Object {
          "keen.key": "2019-01-01T00:00:00.000Z",
          "keen.value": Array [
            "Dr.",
            "Miss",
            "Mr.",
            "Mrs.",
            "Ms.",
          ],
          "user.country": "Albania",
        },
        Object {
          "keen.key": "2020-01-01T00:00:00.000Z",
          "keen.value": Array [
            "Dr.",
            "Miss",
            "Mr.",
            "Mrs.",
            "Ms.",
          ],
          "user.country": "Afghanistan",
        },
        Object {
          "keen.key": "2020-01-01T00:00:00.000Z",
          "keen.value": Array [
            "Dr.",
            "Mrs.",
            "Ms.",
          ],
          "user.country": "Guernsey",
        },
        Object {
          "keen.key": "2021-01-01T00:00:00.000Z",
          "keen.value": Array [],
          "user.country": "Afghanistan",
        },
        Object {
          "keen.key": "2021-01-01T00:00:00.000Z",
          "keen.value": Array [],
          "user.country": "Algeria",
        },
      ],
      "keys": Array [
        "keen.value",
        "user.country",
      ],
    }
  `);
});

test('transform chronological nominal results in "America/Grenada (-04:00)" named timezone', () => {
  const result = [
    {
      value: [
        { 'user.country': 'Afghanistan', result: [] },
        {
          'user.country': 'Albania',
          result: ['Dr.', 'Miss', 'Mr.', 'Mrs.', 'Ms.'],
        },
      ],
      timeframe: {
        start: '2019-01-01T20:00:00.000Z',
        end: '2020-01-01T00:00:00.000Z',
      },
    },
  ];

  expect(
    transformChronologicalCategoricalNominal({ result }, {
      dateModifier: 'America/Grenada',
    } as ParserSettings)
  ).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "keen.key": "2019-01-01T16:00:00.000Z",
          "keen.value": Array [],
          "user.country": "Afghanistan",
        },
        Object {
          "keen.key": "2019-01-01T16:00:00.000Z",
          "keen.value": Array [
            "Dr.",
            "Miss",
            "Mr.",
            "Mrs.",
            "Ms.",
          ],
          "user.country": "Albania",
        },
      ],
      "keys": Array [
        "keen.value",
        "user.country",
      ],
    }
  `);
});

test('all keys should be string', () => {
  const result = [
    {
      value: [
        { 200: 'Afghanistan', result: [] },
        {
          200: 'Albania',
          result: ['Dr.', 'Miss', 'Mr.', 'Mrs.', 'Ms.'],
        },
      ],
      timeframe: {
        start: '2019-01-01T20:00:00.000Z',
        end: '2020-01-01T00:00:00.000Z',
      },
    },
  ];

  const { data, keys } = transformChronologicalCategoricalNominal({ result }, {
    dateModifier: 'America/Grenada',
  } as ParserSettings);

  const dataKeys = [];

  for (const property in data[0]) {
    dataKeys.push(property);
  }

  expect(keys.every((key) => typeof key === 'string')).toBeTruthy();
  expect(dataKeys.every((key) => typeof key === 'string')).toBeTruthy();
});
