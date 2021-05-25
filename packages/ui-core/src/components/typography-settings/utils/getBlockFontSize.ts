import { DraftInlineStyle } from 'draft-js';

import { DEFAULT_FONT_SIZE } from '../constants';

import { EditorFontSize } from '../types';

const getBlockFontSize = (inlineStyle: DraftInlineStyle) => {
  let fontSize = DEFAULT_FONT_SIZE;

  Object.keys(EditorFontSize).forEach(
    (fontSizeAttribute: keyof typeof EditorFontSize) => {
      if (inlineStyle.has(fontSizeAttribute))
        fontSize = EditorFontSize[fontSizeAttribute];
    }
  );

  return fontSize;
};

export default getBlockFontSize;
