import WebFont from 'webfontloader';
import FontLoaderInstance from './font-loader';

jest.mock('webfontloader', () => ({
  load: jest.fn(),
}));

describe('FontLoaderInstance', () => {
  const fontFamily = 'Roboto';

  it('should call load function', () => {
    FontLoaderInstance.loadFont(fontFamily);
    expect(WebFont.load).toHaveBeenCalled();
  });

  it('should not call load function once again', () => {
    FontLoaderInstance.loadFont(fontFamily);
    expect(WebFont.load).toHaveBeenCalledTimes(1);
  });
});
