/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { mount } from 'enzyme';
import FontLoaderInstance from './font-loader';

import { useFontLoader } from './text.utils';

jest.mock('./font-loader', () => ({
  loadFont: jest.fn(),
}));

describe('@keen/ui-core - <Text /> utils', () => {
  describe('useFontLoader', () => {
    const testHook = (runHook: Function) => {
      const HookWrapper = () => <div hook-result={runHook()} />;

      const wrapper = mount(<HookWrapper />);
      return wrapper.find('div').props()['hook-result'];
    };

    it('should fetch fonts from Google API', () => {
      const runHook = () => useFontLoader('Roboto');
      testHook(runHook);
      expect(FontLoaderInstance.loadFont).toHaveBeenCalled();
    });
  });
});
