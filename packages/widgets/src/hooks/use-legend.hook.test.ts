import { renderHook, act } from '@testing-library/react-hooks';

import { useLegend } from './use-legend.hook';

test('allows to set a disabled key', () => {
  const { result } = renderHook(() => useLegend());
  act(() => {
    result.current.updateKeys('IT', true);
  });

  expect(result.current.disabledKeys).toMatchInlineSnapshot(`
    Array [
      "IT",
    ]
  `);
});

test('allows to reset a disabled key', () => {
  const { result } = renderHook(() => useLegend());
  act(() => {
    result.current.updateKeys('IT', true);
    result.current.updateKeys('IT', false);
  });

  expect(result.current.disabledKeys).toMatchInlineSnapshot(`Array []`);
});
