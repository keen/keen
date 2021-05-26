import { renderHook } from '@testing-library/react-hooks';
import { useOnClickOutside } from './use-on-click-outside';
import { fireEvent } from '@testing-library/react';
import { describe } from 'jest-circus';

describe('useOnClickOutside()', () => {
  test('Should call onClickOutside function when outside elements are clicked', () => {
    const elem = document.createElement('div');
    const ref = { current: elem };
    const mockFn = jest.fn();
    renderHook(() => useOnClickOutside(ref, mockFn));
    fireEvent.click(document);
    expect(mockFn).toBeCalled();
  });

  test('Should not call onClickOutside function when inside elements are clicked', () => {
    const elem = document.createElement('div');
    const ref = { current: elem };
    const mockFn = jest.fn();
    renderHook(() => useOnClickOutside(ref, mockFn));
    fireEvent.click(elem);
    expect(mockFn).not.toBeCalled();
  });
});
