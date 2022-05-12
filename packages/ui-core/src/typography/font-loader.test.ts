import { waitFor } from '@testing-library/react';
import WebFont from 'webfontloader';

import FontLoaderInstance from './font-loader';

jest.mock('webfontloader', () => ({
  load: jest.fn(),
}));

describe('FontLoaderInstance', () => {
  const fontFamily = 'Roboto';

  test('should call load function', async () => {
    FontLoaderInstance.loadFont([fontFamily]);

    await waitFor(() => {
      expect(WebFont.load).toHaveBeenCalled();
    });
  });
});
