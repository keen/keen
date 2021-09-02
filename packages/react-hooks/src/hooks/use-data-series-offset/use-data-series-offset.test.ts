import { renderHook, act } from '@testing-library/react-hooks';

import { useDataSeriesOffset } from './use-data-series-offset';

test('allows to set offset when legend is enabled', () => {
  const { result } = renderHook(() => useDataSeriesOffset(10, true));

  act(() => {
    result.current.setDataSeriesOffset([2, 4]);
  });

  expect(result.current.dataSeriesOffset).toMatchInlineSnapshot(`
    Array [
      2,
      4,
    ]
  `);
});

test('reset offset to default when legend is disabled', () => {
  const { result } = renderHook(() => useDataSeriesOffset(10, false));

  expect(result.current.dataSeriesOffset).toMatchInlineSnapshot(`
    Array [
      0,
      10,
    ]
  `);
});
