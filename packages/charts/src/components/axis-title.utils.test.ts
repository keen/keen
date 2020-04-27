import { colors } from '@keen.io/colors';
import { Orientation } from '../types';

import { theme } from '../theme';

import {
  getHorizontalPosition,
  getVerticalPosition,
  getTextAnchor,
  getAxisTheme,
} from './axis-title.utils';

describe('@keen.io/charts - <AxisTitle /> utils', () => {
  const line = { x1: 0, x2: 100, y1: 100, y2: 0 };
  const { x1, x2, y1, y2 } = line;
  const customTheme = {
    ...theme,
    axisX: {
      tickSize: 10,
      tickPadding: 10,
      labels: {},
      title: {
        alignment: 'center',
        typography: {
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: 14,
          fontFamily: 'Lato Bold, sans-serif',
          fontColor: colors.blue['500'],
        },
      },
    },
    axisY: {
      tickSize: 20,
      tickPadding: 20,
      labels: {},
      title: {
        alignment: 'center',
        typography: {
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: 12,
          fontFamily: 'Lato Bold, sans-serif',
          fontColor: colors.blue['500'],
        },
      },
    },
  };

  describe('getVerticalPosition()', () => {
    it('should return offset for "top" alignment', () => {
      const top = getVerticalPosition('top', line);
      expect(top).toEqual(-y2);
    });

    it('should return offset for "bottom" alignment', () => {
      const bottom = getVerticalPosition('bottom', line);
      expect(bottom).toEqual(-y1);
    });

    it('should return offset for "center" alignment', () => {
      const center = getVerticalPosition('center', line);
      expect(center).toEqual(-(y1 + (y2 - y1) / 2));
    });
  });
  describe('getHorizontalPosition()', () => {
    it('should return offset for "left" alignment', () => {
      const left = getHorizontalPosition('left', line);
      expect(left).toEqual(x1);
    });

    it('should return offset for "right" alignment', () => {
      const right = getHorizontalPosition('right', line);
      expect(right).toEqual(x2);
    });

    it('should return offset for "center" alignment', () => {
      const center = getHorizontalPosition('center', line);
      expect(center).toEqual(x1 + (x2 - x1) / 2);
    });
  });
  describe('getTextAnchor()', () => {
    it('should return "start" anchor', () => {
      const left = getTextAnchor('left');
      const bottom = getTextAnchor('bottom');

      expect(left).toEqual('start');
      expect(bottom).toEqual('start');
    });

    it('should return "end" anchor', () => {
      const right = getTextAnchor('right');
      const top = getTextAnchor('top');

      expect(right).toEqual('end');
      expect(top).toEqual('end');
    });

    it('should return "middle" anchor', () => {
      const center = getTextAnchor('center');
      const empty = getTextAnchor('');

      expect(center).toEqual('middle');
      expect(empty).toEqual('middle');
    });
  });
  describe('getAxisTheme()', () => {
    it('should return vertical theme for vertical layout and horizontal orientation', () => {
      const axisTheme = getAxisTheme(
        'vertical',
        Orientation.HORIZONTAL,
        customTheme
      );
      expect(axisTheme).toEqual(customTheme.axisY);
    });

    it('should return horizontal theme for horizontal layout and vertical orientation', () => {
      const axisTheme = getAxisTheme(
        'vertical',
        Orientation.VERTICAL,
        customTheme
      );
      expect(axisTheme).toEqual(customTheme.axisX);
    });

    it('should return vertical theme for no layout layout and vertical orientation', () => {
      const axisTheme = getAxisTheme(
        undefined,
        Orientation.VERTICAL,
        customTheme
      );
      expect(axisTheme).toEqual(customTheme.axisY);
    });

    it('should return horizontal theme for horizontal orientation', () => {
      const axisTheme = getAxisTheme(
        undefined,
        Orientation.HORIZONTAL,
        customTheme
      );
      expect(axisTheme).toEqual(customTheme.axisX);
    });

    it('should return horizontal theme for horizontal layout and horizontal orientation', () => {
      const axisTheme = getAxisTheme(
        'horizontal',
        Orientation.HORIZONTAL,
        customTheme
      );
      expect(axisTheme).toEqual(customTheme.axisX);
    });
  });
});
