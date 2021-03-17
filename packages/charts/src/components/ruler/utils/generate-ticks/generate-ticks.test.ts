import { scaleBand, scaleLinear, scaleUtc } from 'd3-scale';
import {
  register as registerTimezone,
  unregister as unregisterTimezone,
} from 'timezone-mock';
import { ScaleSettings } from '@keen.io/charts-utils';

beforeAll(() => {
  registerTimezone('UTC');
});

afterAll(() => {
  unregisterTimezone();
});

import { generateTicks, EDGE_TICK_ALIGN } from './generate-ticks';

import { Orientation } from '../../../../types';

test('create additional ticks for "band" scale with time precision', () => {
  const domain = ['Sales', 'Marketing', 'E-commerce'];
  const scaleSettings: ScaleSettings = {
    type: 'time',
    precision: 'month',
  };

  const scale = scaleBand()
    .range([
      new Date('2020-01-01T00:00:00.000Z'),
      new Date('2020-06-01T00:00:00.000Z'),
    ])
    .domain(domain);

  const { ticks, ticksPrecision } = generateTicks({
    x: 0,
    y: 0,
    scale,
    scaleSettings,
    tickSize: 10,
  });

  expect(ticks.length).toEqual(5);
  expect(ticksPrecision).toEqual(scaleSettings.precision);
});

test('creates ticks for vertical linear scale', () => {
  const scale = scaleLinear().range([0, 0]).domain([0, 90]);

  const ticks = generateTicks({
    x: 0,
    y: 0,
    scale,
    tickSize: 5,
    orientation: Orientation.VERTICAL,
  });

  expect(ticks).toMatchSnapshot();
});

test('creates ticks for horizontal linear scale', () => {
  const scale = scaleLinear().range([0, 0]).domain([0, 90]);

  const ticks = generateTicks({
    x: 0,
    y: 0,
    scale,
    tickSize: 5,
    orientation: Orientation.HORIZONTAL,
  });

  expect(ticks).toMatchSnapshot();
});

test('creates ticks for time scale', () => {
  const scale = scaleUtc()
    .range([0, 150])
    .domain([
      new Date('2020-01-01T00:00:00.000Z'),
      new Date('2020-06-01T00:00:00.000Z'),
    ]);

  const scaleSettings: ScaleSettings = {
    type: 'time',
    precision: 'month',
  };

  const ticks = generateTicks({
    x: 0,
    y: 0,
    scale,
    tickSize: 10,
    orientation: Orientation.VERTICAL,
    scaleSettings,
  });

  expect(ticks).toMatchInlineSnapshot(`
    Object {
      "ticks": Array [
        Object {
          "size": 10,
          "text": "2020-01-01T00:00:00.000Z",
          "x": 0.5,
          "y": 0,
        },
        Object {
          "size": 10,
          "text": "2020-04-01T00:00:00.000Z",
          "x": 0.5,
          "y": 89.80263157894737,
        },
      ],
      "ticksPrecision": "month",
    }
  `);
});

test('increase size of scale "band" edge ticks', () => {
  const domain = ['Sales', 'Marketing', 'E-commerce'];
  const tickSize = 5;

  const scale = scaleBand()
    .range([
      new Date('2020-01-01T00:00:00.000Z'),
      new Date('2020-06-01T00:00:00.000Z'),
    ])
    .domain(domain);

  const { ticks } = generateTicks({
    x: 0,
    y: 0,
    scale,
    tickSize,
  });

  const edgeTicks = ticks.slice(ticks.length - 2, ticks.length);
  edgeTicks.forEach(({ size }) => {
    expect(size).toEqual(tickSize + EDGE_TICK_ALIGN);
  });
});
