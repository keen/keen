/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { mount } from 'enzyme';

import { useRenderMode } from './legend.utils';

describe('@keen.io/charts - <Legend /> utils', () => {
  describe('useRenderMode()', () => {
    const testHook = (runHook: any) => {
      const HookWrapper = () => <div hook-result={runHook()} />;

      const wrapper = mount(<HookWrapper />);
      return wrapper.find('div').props()['hook-result'];
    };

    it('should set renderMode to "list" for no overflow', () => {
      const refElement = {
        current: {
          offsetWidth: 140,
          scrollWidth: 140,
        },
      } as React.MutableRefObject<HTMLElement>;

      const runHook = () =>
        useRenderMode(refElement, 'horizontal', 'top', 'list');
      const result = testHook(runHook);

      expect(result).toMatchInlineSnapshot(`
        Object {
          "initialDimension": Object {
            "offset": 0,
            "scroll": 0,
          },
          "mode": "list",
        }
      `);
    });

    it('should set renderMode to "slider" for horizontal overflow and store dimension', () => {
      const refElement = {
        current: {
          offsetWidth: 140,
          scrollWidth: 300,
        },
      } as React.MutableRefObject<HTMLElement>;

      const runHook = () =>
        useRenderMode(refElement, 'horizontal', 'top', 'list');
      const result = testHook(runHook);

      expect(result).toMatchInlineSnapshot(`
        Object {
          "initialDimension": Object {
            "offset": 140,
            "scroll": 300,
          },
          "mode": "slider",
        }
      `);
    });

    it('should set renderMode to "slider" for vertical overflow and store dimension', () => {
      const refElement = {
        current: {
          offsetHeight: 140,
          scrollHeight: 200,
        },
      } as React.MutableRefObject<HTMLElement>;

      const runHook = () =>
        useRenderMode(refElement, 'vertical', 'bottom', 'list');
      const result = testHook(runHook);

      expect(result).toMatchInlineSnapshot(`
        Object {
          "initialDimension": Object {
            "offset": 140,
            "scroll": 200,
          },
          "mode": "slider",
        }
      `);
    });
  });
});
