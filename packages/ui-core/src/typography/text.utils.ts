import { useEffect } from 'react';
import FontLoaderInstance from './font-loader';

export const useFontLoader = (fontFamily: string) => {
  useEffect(() => {
    FontLoaderInstance.loadFont(fontFamily);
  }, [fontFamily]);
};
