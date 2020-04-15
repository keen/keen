import { scaleBand, scaleLinear } from 'd3-scale';

import { generateGridLines, AxisType } from './grid.utils';

describe('@keen.io/charts', () => {
  describe('<Grid /> - utils', () => {
    describe('generateGridLines()', () => {
      const margins = { top: 10, right: 10, bottom: 10, left: 10 };
      const dimension = {
        width: 100,
        height: 100,
      };

      it('should calculate lines coordinates for band scale x', () => {
        const domain = ['January', 'February'];
        const scale = scaleBand()
          .range([0, 100])
          .domain(domain);

        const lines = generateGridLines({
          scale,
          dimension,
          margins,
          axisType: AxisType.X,
        });

        expect(lines).toMatchSnapshot();
        expect(lines.length).toEqual(4);
      });

      it('should calculate lines coordinates for band scale y', () => {
        const domain = ['January', 'February', 'March', 'April'];
        const scale = scaleBand()
          .range([0, 200])
          .domain(domain);

        const lines = generateGridLines({
          scale,
          dimension,
          margins,
          axisType: AxisType.Y,
        });

        expect(lines).toMatchSnapshot();
        expect(lines.length).toEqual(6);
      });

      it('should calculate lines coordinates for linear scale y', () => {
        const scale = scaleLinear()
          .range([0, 100])
          .domain([10, 60]);

        const lines = generateGridLines({
          scale,
          dimension,
          margins,
          axisType: AxisType.Y,
        });

        expect(scale.ticks().length).toEqual(lines.length);
        expect(lines).toMatchSnapshot();
      });

      it('should calculate lines coordinates for linear scale x', () => {
        const scale = scaleLinear()
          .range([0, 100])
          .domain([10, 90]);

        const lines = generateGridLines({
          scale,
          dimension,
          margins,
          axisType: AxisType.X,
        });

        expect(scale.ticks().length).toEqual(lines.length);
        expect(lines).toMatchSnapshot();
      });
    });
  });
});
