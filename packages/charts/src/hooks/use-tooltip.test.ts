import { renderHook, act } from '@testing-library/react-hooks';

import { useTooltip } from './use-tooltip';

test('set tooltip visibility', () => {
  window.requestAnimationFrame = callback => {
    callback(null);
    return null;
  };
  const container = {
    current: {
      getBoundingClientRect: jest.fn().mockReturnValue({
        top: 0,
        left: 0,
      }),
    },
  };

  const { result } = renderHook(() => useTooltip(container));
  const event = {
    persist: jest.fn(),
    pageX: 10,
    pageY: 10,
  };

  act(() => {
    result.current.updateTooltipPosition(event);
  });

  expect(result.current.tooltipVisible).toBeTruthy();
});

test('hide tooltip and reset properties', () => {
  window.requestAnimationFrame = callback => {
    callback(null);
    return null;
  };
  const container = {
    current: {
      getBoundingClientRect: jest.fn().mockReturnValue({
        top: 0,
        left: 0,
      }),
    },
  };

  const { result } = renderHook(() => useTooltip(container));

  act(() => {
    result.current.hideTooltip();
  });

  const { tooltipVisible, tooltipSelectors, tooltipMeta } = result.current;

  expect(tooltipVisible).toBeFalsy();
  expect(tooltipSelectors).toBeNull();
  expect(tooltipMeta).toBeNull();
});

test('calculates tooltip position', () => {
  window.requestAnimationFrame = callback => {
    callback(null);
    return null;
  };
  const container = {
    current: {
      getBoundingClientRect: jest.fn().mockReturnValue({
        top: 10,
        left: 20,
      }),
    },
  };

  const { result } = renderHook(() => useTooltip(container));
  const event = {
    persist: jest.fn(),
    pageX: 20,
    pageY: 40,
  };

  act(() => {
    result.current.updateTooltipPosition(event);
  });

  expect(result.current.tooltipPosition).toMatchInlineSnapshot(`
    Object {
      "x": 0,
      "y": 30,
    }
  `);
});

test('set tooltip meta data', () => {
  window.requestAnimationFrame = callback => {
    callback(null);
    return null;
  };
  const container = {
    current: {
      getBoundingClientRect: jest.fn().mockReturnValue({
        top: 0,
        left: 0,
      }),
    },
  };

  const { result } = renderHook(() => useTooltip(container));
  const meta = { category: 'security' };
  const event = {
    persist: jest.fn(),
    pageX: 10,
    pageY: 10,
  };

  act(() => {
    result.current.updateTooltipPosition(event, null, meta);
  });

  expect(result.current.tooltipMeta).toEqual(meta);
});

test('set tooltip data selectos', () => {
  window.requestAnimationFrame = callback => {
    callback(null);
    return null;
  };
  const container = {
    current: {
      getBoundingClientRect: jest.fn().mockReturnValue({
        top: 0,
        left: 0,
      }),
    },
  };

  const { result } = renderHook(() => useTooltip(container));
  const selectors = [{ selector: [0, 'name'], color: 'black' }];
  const event = {
    persist: jest.fn(),
    pageX: 10,
    pageY: 10,
  };

  act(() => {
    result.current.updateTooltipPosition(event, selectors);
  });

  expect(result.current.tooltipSelectors).toEqual(selectors);
});

test('calculates tooltip position relative to event target', () => {
  window.requestAnimationFrame = callback => {
    callback(null);
    return null;
  };
  const container = {
    current: {
      getBoundingClientRect: jest.fn().mockReturnValue({
        top: 10,
        left: 20,
      }),
    },
  };

  const { result } = renderHook(() => useTooltip(container, true));
  const event = {
    persist: jest.fn(),
    pageX: 20,
    pageY: 40,
    target: {
      getBoundingClientRect: jest.fn().mockReturnValue({
        width: 100,
        height: 100,
        top: 10,
        left: 20,
      }),
    },
  };

  act(() => {
    result.current.updateTooltipPosition(event);
  });

  expect(result.current.tooltipPosition).toMatchInlineSnapshot(`
    Object {
      "x": 50,
      "y": 50,
    }
  `);
});
