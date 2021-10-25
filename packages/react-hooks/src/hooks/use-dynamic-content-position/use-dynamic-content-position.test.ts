import { act, renderHook } from '@testing-library/react-hooks';
import { describe } from 'jest-circus';
import { useDynamicContentPosition } from './use-dynamic-content-position';

describe('useDynamicContentPosition()', () => {
  test('returns position below parent component', () => {
    const el = document.createElement('div');
    el.getBoundingClientRect = jest.fn().mockImplementation(() => ({
      x: 10,
      y: 15,
      height: 100,
      width: 100,
    }));
    const ref = { current: el };
    const { result } = renderHook(() => useDynamicContentPosition(ref));
    act(() => {
      result.current.setPosition();
    });
    expect(result.current.contentPosition).toStrictEqual({
      x: 10,
      y: 115,
      width: 100,
    });
  });

  test('do not calculates position for non existing parent', () => {
    const ref = { current: null };
    const { result } = renderHook(() => useDynamicContentPosition(ref));
    act(() => {
      result.current.setPosition();
    });

    expect(result.current.contentPosition).toStrictEqual({
      x: 0,
      y: 0,
      width: 0,
    });
  });
});
