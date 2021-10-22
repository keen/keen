import { act, renderHook } from '@testing-library/react-hooks';
import { describe } from 'jest-circus';
import { useDynamicContentPosition } from './use-dynamic-content-position';

describe('useDynamicContentPosition()', () => {
  test('Should return position below parent component', () => {
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
});
