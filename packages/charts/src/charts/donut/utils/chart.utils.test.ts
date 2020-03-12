import { generateDonutChart } from './chart.utils';

import { donutChart } from '../donut-chart.fixtures';

describe('@keen/charts', () => {
  describe('<DonutChart /> - utils', () => {
    it('should create arcs based on provided data', () => {
      const { arcs } = generateDonutChart(donutChart);
      const { data } = donutChart;

      expect(arcs.length).toEqual(data.length);
    });

    it('should calculate properties for each arc', () => {
      const { arcs } = generateDonutChart(donutChart);

      expect(arcs).toMatchSnapshot();
    });

    it('should calculate position for labels placed "outer" of slice', () => {
      const { arcs } = generateDonutChart({
        ...donutChart,
        labelsPosition: 'outside',
      });

      expect(arcs).toMatchSnapshot();
    });
  });
});
