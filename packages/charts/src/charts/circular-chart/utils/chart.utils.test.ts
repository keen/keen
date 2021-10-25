import {
  generateCircularChart,
  createStackedSlice,
  calculateTresholdPercent,
  getSlicesToStack,
} from './chart.utils';

import { pieChart } from '../../pie/pie-chart.fixtures';

describe('@keen/charts - generateCircularChart', () => {
  const slices = [
    { color: 'red', value: 100, selector: [0] },
    { color: 'blue', value: 100, selector: [1] },
    { color: 'yellow', value: 5, selector: [2] },
    { color: 'violet', value: 3, selector: [3] },
    { color: 'green', value: 2, selector: [4] },
  ];

  const colors = ['red', 'blue', 'yellow', 'violet', 'green'];

  describe('getSlicesToStack()', () => {
    it('should get all slices with values that fit threshold percent value', () => {
      const slicesToStack = [
        {
          color: 'yellow',
          selector: [2],
          value: 5,
        },
        {
          color: 'violet',
          selector: [3],
          value: 3,
        },
        {
          color: 'green',
          selector: [4],
          value: 2,
        },
      ];
      const result = getSlicesToStack({
        slices,
        total: 210,
        tresholdPercent: 5,
      });
      expect(result).toStrictEqual(slicesToStack);
    });
  });

  describe('createStackedSlice()', () => {
    it('should create "stack" from 3 slices', () => {
      const slicesToStack = getSlicesToStack({
        slices,
        total: 210,
        tresholdPercent: 5,
      });
      const result = createStackedSlice({
        slices,
        treshold: 5,
        total: 210,
        slicesToStack,
        colors,
      });
      expect(result).toMatchSnapshot();
    });

    it('should not create "stack" and return original slices', () => {
      const slicesToStack = getSlicesToStack({
        slices,
        total: 210,
        tresholdPercent: 1,
      });
      const result = createStackedSlice({
        slices,
        treshold: 1,
        total: 210,
        slicesToStack,
        colors,
      });
      expect(result).toMatchSnapshot();
    });
  });

  describe('calculateTresholdPercent()', () => {
    it('should return 50', () => {
      const result = calculateTresholdPercent(100, 50);

      expect(result).toEqual(50);
    });
    it('should return 25', () => {
      const result = calculateTresholdPercent(12, 3);

      expect(result).toEqual(25);
    });
    it('should return 100', () => {
      const result = calculateTresholdPercent(5, 5);

      expect(result).toEqual(100);
    });
  });

  describe('generateCircularChart()', () => {
    it('should create arcs based on provided data', () => {
      const { arcs } = generateCircularChart(pieChart);
      const { data } = pieChart;

      expect(arcs.length).toEqual(data.length);
    });

    it('should calculate properties for each arc', () => {
      const { arcs } = generateCircularChart(pieChart);

      expect(arcs).toMatchSnapshot();
    });

    it('should calculate position for labels placed "outer" of slice', () => {
      const { arcs } = generateCircularChart({
        ...pieChart,
        labelsPosition: 'outside',
      });

      expect(arcs).toMatchSnapshot();
    });
  });
});
