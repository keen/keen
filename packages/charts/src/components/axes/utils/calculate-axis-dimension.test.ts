import getTextBBox from './get-text-bbox';
import calculateAxisDimension from './calculate-axis-dimension';

import { theme } from '../../../theme';

import { Orientation } from '../../../types';

jest.mock('./get-text-bbox');

(getTextBBox as any).mockImplementation(() => ({
  width: 10,
  height: 10,
}));

beforeEach(() => {
  (getTextBBox as any).mockClear();
});

test('calculates dimension for vertical axis', () => {
  const result = calculateAxisDimension({
    axisTheme: theme.axisY,
    orientation: Orientation.VERTICAL,
    label: 'Marketing',
  });

  expect(result).toMatchInlineSnapshot(`
    Object {
      "height": 10,
      "width": 20,
    }
  `);
});

test('calculates dimension for vertical axis with title', () => {
  const {
    axisY: {
      title: { typography },
    },
  } = theme;
  const result = calculateAxisDimension({
    axisTheme: theme.axisY,
    orientation: Orientation.VERTICAL,
    label: 'Marketing',
    axisTitle: 'Axis Y Title',
  });

  expect(getTextBBox).toHaveBeenCalledWith('Axis Y Title', {
    fontSize: typography.fontSize,
    fontFamily: typography.fontFamily,
  });

  expect(result).toMatchInlineSnapshot(`
    Object {
      "height": 10,
      "width": 50,
    }
  `);
});

test('calculates dimension for horizontal axis', () => {
  const result = calculateAxisDimension({
    axisTheme: theme.axisX,
    orientation: Orientation.HORIZONTAL,
    label: 'Marketing',
  });

  expect(result).toMatchInlineSnapshot(`
    Object {
      "height": 25,
      "width": 10,
    }
  `);
});

test('calculates dimension for horizontal axis with title', () => {
  const {
    axisX: {
      title: { typography },
    },
  } = theme;
  const result = calculateAxisDimension({
    axisTheme: theme.axisX,
    orientation: Orientation.HORIZONTAL,
    label: 'Marketing',
    axisTitle: 'Axis X Title',
  });

  expect(getTextBBox).toHaveBeenCalledWith('Axis X Title', {
    fontSize: typography.fontSize,
    fontFamily: typography.fontFamily,
  });

  expect(result).toMatchInlineSnapshot(`
    Object {
      "height": 55,
      "width": 10,
    }
  `);
});
