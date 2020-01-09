import { generatePieChart } from './pie-chart.utils';

import { pieChart } from './pie-chart.fixtures';

describe('@keen/charts', () => {
  describe('<PieChart /> - utils', () => {
    it('should create arcs based on provided data', () => {
      const { arcs } = generatePieChart(pieChart);
      const { data } = pieChart;

      expect(arcs.length).toEqual(data.length);
    });

    it('should calculate properties for each arc', () => {
      const { arcs } = generatePieChart(pieChart);

      expect(arcs).toMatchSnapshot();
    });

    it('should calculate position for labels placed "outer" of slice', () => {
      const { arcs } = generatePieChart({
        ...pieChart,
        labelsPosition: 'outside',
      });

      expect(arcs).toMatchSnapshot();
    });
  });
});
