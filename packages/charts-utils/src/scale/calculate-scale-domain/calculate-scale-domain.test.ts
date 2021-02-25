import { scaleLinear } from 'd3-scale';

import calculateScaleDomain from './calculate-scale-domain';

test('adjusts scale domain based on "minimum" and "maximum" value', () => {
  const minimum = -123;
  const maximum = 1192;
  const scale = scaleLinear().range([0, 100]).domain([minimum, maximum]);

  calculateScaleDomain(scale, minimum, maximum);

  expect(scale.domain()).toMatchInlineSnapshot(`
    Array [
      -200,
      1200,
    ]
  `);
});
