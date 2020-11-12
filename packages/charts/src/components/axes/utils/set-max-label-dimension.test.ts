import { scaleBand, scaleTime } from 'd3-scale';

import {
  setXLabelsDimension,
  setYLabelsDimension,
} from './set-max-label-dimension';

import { theme } from '../../../theme';

const svgDimensions = {
  width: 400,
  height: 100,
};

describe('setXLabelsDimension()', () => {
  test('calculates maximum dimension based on svg element', () => {
    const result = setXLabelsDimension({
      svgDimensions,
      scale: scaleBand(),
      axisTheme: {
        ...theme.axisX,
        labels: {
          ...theme.axisX.labels,
          radiusAngle: 45,
        },
      },
    });

    expect(result).toMatchInlineSnapshot(`20`);
  });

  test('calculates maximum dimension based on scale band', () => {
    const result = setXLabelsDimension({
      svgDimensions,
      scale: scaleBand()
        .range([0, 100])
        .domain(['marketing', 'it']),
      axisTheme: {
        ...theme.axisX,
        labels: {
          ...theme.axisX.labels,
          radiusAngle: 0,
        },
      },
    });

    expect(result).toMatchInlineSnapshot(`50`);
  });

  test('returns "null" for time and linear scales', () => {
    const result = setXLabelsDimension({
      svgDimensions,
      scale: scaleTime(),
      axisTheme: {
        ...theme.axisX,
        labels: {
          ...theme.axisX.labels,
          radiusAngle: 0,
        },
      },
    });

    expect(result).toBeNull();
  });

  test('returns "null" for disabled axis labels', () => {
    const result = setXLabelsDimension({
      svgDimensions,
      scale: scaleBand(),
      axisTheme: {
        ...theme.axisX,
        labels: {
          ...theme.axisX.labels,
          enabled: false,
        },
      },
    });

    expect(result).toBeNull();
  });
});

describe('setYLabelsDimension()', () => {
  test('calculates maximum dimension based on svg element', () => {
    const result = setYLabelsDimension({
      svgDimensions,
      scale: scaleBand(),
      axisTheme: {
        ...theme.axisY,
        labels: {
          ...theme.axisY.labels,
          radiusAngle: 45,
        },
      },
    });

    expect(result).toMatchInlineSnapshot(`80`);
  });

  test('returns "null" for disabled axis labels', () => {
    const result = setYLabelsDimension({
      svgDimensions,
      scale: scaleBand(),
      axisTheme: {
        ...theme.axisY,
        labels: {
          ...theme.axisY.labels,
          enabled: false,
        },
      },
    });

    expect(result).toBeNull();
  });
});
