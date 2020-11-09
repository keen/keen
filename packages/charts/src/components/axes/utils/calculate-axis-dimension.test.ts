import { calculateRotation } from '@keen.io/charts-utils';

import calculateAxisDimension from './calculate-axis-dimension';

import { theme } from '../../../theme';

import { Orientation } from '../../../types';

const svgElement = document.createElementNS(
  'http://www.w3.org/2000/svg',
  'svg'
);

jest.mock('@keen.io/charts-utils', () => {
  return {
    calculateRotation: jest.fn().mockImplementation(() => ({
      width: 30,
      height: 30,
    })),
  };
});

const mockedRect = {
  x: 0,
  y: 0,
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 20,
  height: 10,
  toJSON: () => '',
};

const getBBox = SVGElement.prototype.getBBox;

beforeEach(() => {
  SVGElement.prototype.getBBox = () => {
    return mockedRect;
  };
});

afterAll(() => {
  SVGElement.prototype.getBBox = getBBox;
});

test('calculates dimension for vertical axis', () => {
  const result = calculateAxisDimension({
    axisTheme: theme.axisY,
    orientation: Orientation.VERTICAL,
    svgElement,
  });

  expect(result).toMatchInlineSnapshot(`
    Object {
      "height": 0,
      "width": 10,
    }
  `);
});

test('calculates dimension for vertical axis with rotated labels', () => {
  calculateAxisDimension({
    axisTheme: {
      ...theme.axisY,
      labels: {
        ...theme.axisY.labels,
        radiusAngle: 45,
      },
    },
    orientation: Orientation.VERTICAL,
    svgElement,
  });

  expect(calculateRotation).toHaveBeenCalledWith(0, 0, 45);
});

test('calculates dimension for vertical axis with title', () => {
  const svgElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  );

  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('data-elementid', 'vertical-axis-title');
  svgElement.appendChild(text);

  const result = calculateAxisDimension({
    svgElement,
    axisTheme: theme.axisY,
    orientation: Orientation.VERTICAL,
    axisTitle: 'Axis Y Title',
  });

  expect(result).toMatchInlineSnapshot(`
    Object {
      "height": 0,
      "width": 40,
    }
  `);
});

test('calculates dimension for horizontal axis', () => {
  const result = calculateAxisDimension({
    axisTheme: theme.axisX,
    orientation: Orientation.HORIZONTAL,
    svgElement,
  });

  expect(result).toMatchInlineSnapshot(`
    Object {
      "height": 25,
      "width": 0,
    }
  `);
});

test('calculates dimension for horizontal axis with rotated labels', () => {
  calculateAxisDimension({
    axisTheme: {
      ...theme.axisX,
      labels: {
        ...theme.axisX.labels,
        radiusAngle: 70,
      },
    },
    orientation: Orientation.VERTICAL,
    svgElement,
  });

  expect(calculateRotation).toHaveBeenCalledWith(0, 0, 70);
});

test('calculates dimension for horizontal axis with title', () => {
  const svgElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  );

  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('data-elementid', 'horizontal-axis-title');
  svgElement.appendChild(text);

  const result = calculateAxisDimension({
    axisTheme: theme.axisX,
    orientation: Orientation.HORIZONTAL,
    axisTitle: 'Axis X Title',
    svgElement,
  });

  expect(result).toMatchInlineSnapshot(`
    Object {
      "height": 55,
      "width": 0,
    }
  `);
});
