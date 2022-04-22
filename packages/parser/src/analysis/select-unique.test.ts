import { Query } from '@keen.io/query';

import DataParser from '../DataParser';

const createDataParser = (query: Query) => {
  const {
    mergePropertiesOrder,
    fillEmptyIntervalsKeys,
    transformation,
  } = DataParser.createSettingsFromQuery({ query });

  const dataParser = new DataParser(
    transformation,
    null,
    null,
    fillEmptyIntervalsKeys,
    mergePropertiesOrder
  );

  return dataParser;
};

test('creates structure for "select_unique" analysis with interval and group settings', () => {
  const selectUnique = {
    query: {
      analysis_type: 'select_unique',
      event_collection: 'signups',
      target_property: 'prefix',
      group_by: ['country'],
      interval: 'monthly',
      timeframe: 'this_1_years',
    } as Query,
    result: [
      {
        value: [
          { country: 'Afghanistan', result: [] },
          {
            country: 'Albania',
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
          { country: 'Afghanistan', result: [] },
          { country: 'Algeria', result: [] },
        ],
        timeframe: {
          start: '2021-01-01T00:00:00.000Z',
          end: '2022-01-01T00:00:00.000Z',
        },
      },
    ],
  };

  const { query } = selectUnique;
  const dataParser = createDataParser(query);

  expect(dataParser.parseQueryResults(selectUnique)).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "country": "Afghanistan",
          "keen.key": "2019-01-01T00:00:00.000Z",
          "keen.value": Array [],
        },
        Object {
          "country": "Albania",
          "keen.key": "2019-01-01T00:00:00.000Z",
          "keen.value": Array [
            "Dr.",
            "Miss",
            "Mr.",
            "Mrs.",
            "Ms.",
          ],
        },
        Object {
          "country": "Afghanistan",
          "keen.key": "2021-01-01T00:00:00.000Z",
          "keen.value": Array [],
        },
        Object {
          "country": "Algeria",
          "keen.key": "2021-01-01T00:00:00.000Z",
          "keen.value": Array [],
        },
      ],
      "keys": Array [
        "keen.value",
        "country",
      ],
    }
  `);
});

test('creates structure for "select_unique" analysis with group settings', () => {
  const selectUnique = {
    query: {
      analysis_type: 'select_unique',
      event_collection: 'signups',
      target_property: 'prefix',
      group_by: ['country', 'continent'],
      timeframe: 'this_1_years',
    } as Query,
    result: [
      {
        country: 'Poland',
        continent: 'Europe',
        result: ['Mr.', 'Mrs.', 'Ms.'],
      },
      { country: 'Germany', continent: 'Europe', result: ['Dr.', 'Ms.'] },
      {
        country: 'Ukraine',
        continent: 'Europe',
        result: ['Dr.'],
      },
    ],
  };

  const { query } = selectUnique;
  const dataParser = createDataParser(query);

  expect(dataParser.parseQueryResults(selectUnique)).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "continent": "Europe",
          "country": "Poland",
          "keen.value": Array [
            "Mr.",
            "Mrs.",
            "Ms.",
          ],
        },
        Object {
          "continent": "Europe",
          "country": "Germany",
          "keen.value": Array [
            "Dr.",
            "Ms.",
          ],
        },
        Object {
          "continent": "Europe",
          "country": "Ukraine",
          "keen.value": Array [
            "Dr.",
          ],
        },
      ],
      "keys": Array [
        "keen.value",
        "country",
        "continent",
      ],
    }
  `);
});

test('creates structure for "select_unique" analysis with interval', () => {
  const selectUnique = {
    query: {
      analysis_type: 'select_unique',
      event_collection: 'signups',
      target_property: 'prefix',
      interval: 'monthly',
      timeframe: 'this_1_years',
    } as Query,
    result: [
      {
        value: [],
        timeframe: {
          start: '2019-01-01T00:00:00.000Z',
          end: '2020-01-01T00:00:00.000Z',
        },
      },
      {
        value: ['Dr.', 'Miss', 'Mr.'],
        timeframe: {
          start: '2020-01-01T00:00:00.000Z',
          end: '2021-01-01T00:00:00.000Z',
        },
      },
    ],
  };

  const { query } = selectUnique;
  const dataParser = createDataParser(query);

  expect(dataParser.parseQueryResults(selectUnique)).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "keen.key": "2019-01-01T00:00:00.000Z",
          "keen.value": Array [],
        },
        Object {
          "keen.key": "2020-01-01T00:00:00.000Z",
          "keen.value": Array [
            "Dr.",
            "Miss",
            "Mr.",
          ],
        },
      ],
      "keys": Array [
        "keen.value",
      ],
    }
  `);
});

test('creates structure for simple "select_unique" analysis', () => {
  const selectUnique = {
    query: {
      analysis_type: 'select_unique',
      event_collection: 'signups',
      target_property: 'prefix',
      timeframe: 'this_1_years',
    } as Query,
    result: ['Dr', 'Ms.'],
  };

  const { query } = selectUnique;
  const dataParser = createDataParser(query);

  expect(dataParser.parseQueryResults(selectUnique)).toMatchInlineSnapshot(`
    Object {
      "data": Array [
        Object {
          "keen.value": "Dr",
        },
        Object {
          "keen.value": "Ms.",
        },
      ],
      "keys": Array [
        "keen.value",
      ],
    }
  `);
});
