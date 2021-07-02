import { describe } from 'jest-circus';
import { renderHook } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';
import { useOnParentScroll } from './use-on-parent-scroll';

describe('useOnParentScroll()', () => {
  test('Should call function if referenced element is scrolled', () => {
    const elem = document.createElement('div');
    const ref = { current: elem };
    const mockFn = jest.fn();
    renderHook(() => useOnParentScroll(ref, mockFn));
    fireEvent.scroll(elem, { target: { scrollY: 100 } });
    expect(mockFn).toBeCalled();
  });
  test('Should not call function if referenced element is not scrolled', () => {
    const elem = document.createElement('div');
    const ref = { current: elem };
    const mockFn = jest.fn();
    renderHook(() => useOnParentScroll(ref, mockFn));
    expect(mockFn).not.toBeCalled();
  });
});
