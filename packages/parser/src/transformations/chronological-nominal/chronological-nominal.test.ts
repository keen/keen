import { transformChronologicalNominal } from './chronological-nominal';

import { ParserSettings } from '../../types';

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

  expect(transformChronologicalNominal({ result }, {} as ParserSettings))
    .toMatchInlineSnapshot(`
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

test('transform nominal results in "America/Anguilla (-04:00)" named timezone', () => {
  const result = [
    {
      value: ['Dr.', 'Miss', 'Mr.', 'Mrs.', 'Ms.'],
      timeframe: {
        start: '2020-01-01T16:00:00.000Z',
        end: '2021-01-01T00:00:00.000Z',
      },
    },
  ];

  expect(
    transformChronologicalNominal({ result }, {
      dateModifier: 'America/Anguilla',
    } as ParserSettings)
  ).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "keen.key": "2020-01-01T12:00:00.000Z",
          "keen.value": Array [
            "Dr.",
            "Miss",
            "Mr.",
            "Mrs.",
            "Ms.",
          ],
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
      value: ['Dr.', 'Miss', 'Mr.', 'Mrs.', 'Ms.'],
      timeframe: {
        start: '2020-01-01T16:00:00.000Z',
        end: '2021-01-01T00:00:00.000Z',
      },
    },
  ];

  const keys = transformChronologicalNominal({ result }, {
    dateModifier: 'America/Anguilla',
  } as ParserSettings).keys;

  expect(keys.every((key) => typeof key === 'string')).toBeTruthy();
});
