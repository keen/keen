import { scaleBand } from 'd3-scale';

import getScaleCenterPosition from './get-scale-center-position';

test('creates position "getter" function', () => {
  const scale = scaleBand()
    .range([0, 100])
    .domain(['marketing', 'business', 'sales', 'it']);

  const getPosition = getScaleCenterPosition(scale);
  const result = getPosition('marketing');

  expect(result).toMatchInlineSnapshot(`12.5`);
});
