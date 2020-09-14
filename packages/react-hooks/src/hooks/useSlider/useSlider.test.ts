import { renderHook } from '@testing-library/react-hooks';

import { useSlider } from './useSlider';

test('calculates mininum and maximum values', () => {
  const data = [
    { buy: 10, sold: 2 },
    { buy: 15, sold: 30 },
  ];
  const { result } = renderHook(() => useSlider(data, ['buy', 'sold']));

  expect(result.current).toMatchInlineSnapshot(`
    Object {
      "max": 30,
      "min": 2,
    }
  `);
});
