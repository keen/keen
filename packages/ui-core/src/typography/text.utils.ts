import { useEffect } from 'react';
import FontLoaderInstance from './font-loader';

export const useFontLoader = (fontFamilies: string[]) => {
  useEffect(() => {
    FontLoaderInstance.loadFont(fontFamilies);
  }, [fontFamilies]);

  return FontLoaderInstance.getActiveFonts();
};
