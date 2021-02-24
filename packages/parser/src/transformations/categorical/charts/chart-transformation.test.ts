import { ParserSettings } from '../../../types';
import { categoricalChartTransformation } from './chart-transformation';

test('transforms data with one specified group by property and generates corresponding keys', () => {
  const parserSettings: ParserSettings = {
    fillEmptyIntervalsKeys: false,
    mergePropertiesOrder: ['country'],
    transformation: 'categorical',
  };

  const input = [
    { country: 'Poland', result: 20 },
    { country: 'USA', result: 32 },
    { country: 'Germany', result: 42 },
  ];

  const expectedResult = {
    data: [
      {
        'keen.key': 'country',
        Poland: 20,
        USA: 32,
        Germany: 42,
      },
    ],
    keys: ['Poland', 'USA', 'Germany'],
  };

  expect(categoricalChartTransformation(input, parserSettings)).toMatchObject(
    expectedResult
  );
});

test('transforms data with two specified group by properties and generates corresponding keys', () => {
  const parserSettings: ParserSettings = {
    fillEmptyIntervalsKeys: false,
    mergePropertiesOrder: ['country', 'food'],
    transformation: 'categorical',
  };

  const input = [
    { country: 'Poland', food: 'Burger', result: 10 },
    { country: 'Poland', food: 'Hot-dog', result: 12 },
    { country: 'USA', food: 'Burger', result: 15 },
    { country: 'USA', food: 'Hot-dog', result: 10 },
  ];

  const expectedResult = {
    data: [
      { 'keen.key': 'Poland', Burger: 10, 'Hot-dog': 12 },
      { 'keen.key': 'USA', Burger: 15, 'Hot-dog': 10 },
    ],
    keys: ['Burger', 'Hot-dog'],
  };

  expect(categoricalChartTransformation(input, parserSettings)).toMatchObject(
    expectedResult
  );
});

test('transforms data with more than two specified group by properties and generates corresponding keys', () => {
  const parserSettings: ParserSettings = {
    fillEmptyIntervalsKeys: false,
    mergePropertiesOrder: ['country', 'food', 'size'],
    transformation: 'categorical',
  };

  const input = [
    { country: 'Poland', food: 'Burger', size: 'small', result: 10 },
    { country: 'Poland', food: 'Burger', size: 'big', result: 30 },
    { country: 'Poland', food: 'Hot-dog', size: 'big', result: 12 },
    { country: 'Poland', food: 'Hot-dog', size: 'small', result: 32 },
    { country: 'USA', food: 'Burger', size: 'small', result: 15 },
    { country: 'USA', food: 'Burger', size: 'big', result: 20 },
    { country: 'USA', food: 'Hot-dog', size: 'small', result: 10 },
    { country: 'USA', food: 'Hot-dog', size: 'big', result: 14 },
  ];

  const expectedResult = {
    data: [
      {
        'keen.key': 'Poland',
        'Burger | small': 10,
        'Burger | big': 30,
        'Hot-dog | big': 12,
        'Hot-dog | small': 32,
      },
      {
        'keen.key': 'USA',
        'Burger | small': 15,
        'Burger | big': 20,
        'Hot-dog | small': 10,
        'Hot-dog | big': 14,
      },
    ],
    keys: [
      'Burger | small',
      'Burger | big',
      'Hot-dog | big',
      'Hot-dog | small',
    ],
  };
  expect(categoricalChartTransformation(input, parserSettings)).toMatchObject(
    expectedResult
  );
});

test('transforms data and fill missing keys across data series', () => {
  const parserSettings: ParserSettings = {
    fillEmptyIntervalsKeys: false,
    mergePropertiesOrder: ['country', 'food', 'size'],
    transformation: 'categorical',
  };

  const input = [
    { country: 'Poland', food: 'Burger', size: 'small', result: 10 },
    { country: 'USA', food: 'Burger', size: 'big', result: 30 },
  ];

  const expectedResult = {
    data: [
      {
        'keen.key': 'Poland',
        'Burger | big': 0,
        'Burger | small': 10,
      },
      {
        'keen.key': 'USA',
        'Burger | big': 30,
        'Burger | small': 0,
      },
    ],
    keys: ['Burger | small', 'Burger | big'],
  };

  expect(categoricalChartTransformation(input, parserSettings)).toEqual(
    expectedResult
  );
});

test('transforms data with "null" values', () => {
  const parserSettings: ParserSettings = {
    fillEmptyIntervalsKeys: false,
    mergePropertiesOrder: ['country', 'city'],
    transformation: 'categorical',
  };

  const input = [
    { country: null, city: 'Cracow', result: 20 },
    { country: null, city: null, result: 20 },
    { country: 'USA', city: 'Berlin', result: 32 },
  ];

  const expectedResult = {
    data: [
      {
        Berlin: 0,
        Cracow: 20,
        'keen.key': null,
        null: 20,
      },
      {
        Berlin: 32,
        Cracow: 0,
        'keen.key': 'USA',
        null: 0,
      },
    ],
    keys: ['Cracow', 'null', 'Berlin'],
  };

  expect(categoricalChartTransformation(input, parserSettings)).toMatchObject(
    expectedResult
  );
});
