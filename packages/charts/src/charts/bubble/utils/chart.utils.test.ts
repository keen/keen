import { generateBubbles } from './chart.utils';

import { chartFixture } from '../bubble-chart.fixtures';

describe('@keen.io/charts', () => {
  describe('<BubbleChart /> - utils', () => {
    describe('generateBubbles()', () => {
      it('should sort "bubbles" in descending order', () => {
        const { bubbles } = generateBubbles(chartFixture);

        expect(bubbles).toMatchSnapshot();
      });

      it('should calculate cartesian coordinates for center position', () => {
        const { middlePoint } = generateBubbles(chartFixture);

        expect(middlePoint).toMatchInlineSnapshot(`
          Array [
            44,
            50,
          ]
        `);
      });

      it('should create domain for "xScale"', () => {
        const { xScale } = generateBubbles(chartFixture);

        expect(xScale.domain()).toMatchInlineSnapshot(`
          Array [
            0,
            400,
          ]
        `);
      });

      it('should create domain for "yScale"', () => {
        const { yScale } = generateBubbles(chartFixture);

        expect(yScale.domain()).toMatchInlineSnapshot(`
          Array [
            0,
            500,
          ]
        `);
      });
    });
  });
});
