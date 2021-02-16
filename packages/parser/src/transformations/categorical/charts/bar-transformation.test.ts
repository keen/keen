import { ParserSettings } from '../../../types';
import { barTransformation } from './bar-transformation';

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

  expect(barTransformation(input, parserSettings)).toMatchObject(
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

  expect(barTransformation(input, parserSettings)).toMatchObject(
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
        Burger_small: 10,
        Burger_big: 30,
        'Hot-dog_big': 12,
        'Hot-dog_small': 32,
      },
      {
        'keen.key': 'USA',
        Burger_small: 15,
        Burger_big: 20,
        'Hot-dog_small': 10,
        'Hot-dog_big': 14,
      },
    ],
    keys: ['Burger_small', 'Burger_big', 'Hot-dog_big', 'Hot-dog_small'],
  };
  expect(barTransformation(input, parserSettings)).toMatchObject(
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
        Burger_big: 0,
        Burger_small: 10,
      },
      {
        'keen.key': 'USA',
        Burger_big: 30,
        Burger_small: 0,
      },
    ],
    keys: ['Burger_small', 'Burger_big'],
  };

  expect(barTransformation(input, parserSettings)).toEqual(expectedResult);
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

  expect(barTransformation(input, parserSettings)).toMatchObject(
    expectedResult
  );
});
