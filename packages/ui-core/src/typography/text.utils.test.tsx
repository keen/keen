import { renderHook } from '@testing-library/react-hooks';
import FontLoaderInstance from './font-loader';

import { useFontLoader } from './text.utils';

const fonts = ['Roboto', 'Lato'];

jest.mock('./font-loader', () => ({
  loadFont: jest.fn(),
  getActiveFonts: () => fonts,
}));

test('should fetch fonts from Google API', () => {
  renderHook(() => useFontLoader(fonts));
  expect(FontLoaderInstance.loadFont).toHaveBeenCalled();
});

test('should return loaded fonts', () => {
  const { result } = renderHook(() => useFontLoader(fonts));

  expect(result.current).toEqual(fonts);
});
