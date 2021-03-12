import {
  calculateMarkPosition,
  setMarkSize,
  MARK_VARIANTS,
} from './mark.utils';

describe('@keen.io/charts - <BarChart /> utils', () => {
  describe('setMarkSize()', () => {
    test('should use "small" variant for "vertical" layout', () => {
      const mark = setMarkSize({
        layout: 'vertical',
        width: 25,
        height: 60,
      });

      expect(mark).toEqual(MARK_VARIANTS['small']);
    });

    test('should use "normal" variant for "vertical" layout', () => {
      const mark = setMarkSize({
        layout: 'vertical',
        width: 90,
        height: 60,
      });

      expect(mark).toEqual(MARK_VARIANTS['normal']);
    });

    test('should use "small" variant for "horizontal" layout', () => {
      const mark = setMarkSize({
        layout: 'horizontal',
        width: 60,
        height: 25,
      });

      expect(mark).toEqual(MARK_VARIANTS['small']);
    });

    test('should use "normal" variant for "horizontal" layout', () => {
      const mark = setMarkSize({
        layout: 'horizontal',
        width: 30,
        height: 110,
      });

      expect(mark).toEqual(MARK_VARIANTS['normal']);
    });
  });

  describe('calculateMarkPosition()', () => {
    const barProperties = {
      x: 10,
      y: 10,
      width: 100,
      height: 100,
    };

    test('should calculate position for "vertical" layout, positive value', () => {
      const result = calculateMarkPosition({
        ...barProperties,
        layout: 'vertical',
        positiveValue: true,
      });

      expect(result).toEqual({
        x: 60,
        y: 10,
      });
    });

    test('should calculate position for "horizontal" layout, positive value', () => {
      const result = calculateMarkPosition({
        ...barProperties,
        layout: 'horizontal',
        positiveValue: true,
      });

      expect(result).toEqual({
        x: 110,
        y: 60,
      });
    });

    test('should calculate position for "vertical" layout, negative value', () => {
      const result = calculateMarkPosition({
        ...barProperties,
        layout: 'vertical',
        positiveValue: false,
      });

      expect(result).toEqual({
        x: 60,
        y: 110,
      });
    });

    test('should calculate position for "horizontal" layout, negative value', () => {
      const result = calculateMarkPosition({
        ...barProperties,
        layout: 'horizontal',
        positiveValue: false,
      });

      expect(result).toEqual({
        x: 10,
        y: 60,
      });
    });
  });
});
