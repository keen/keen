import { DraftInlineStyleType } from 'draft-js';
import { IconType } from '@keen.io/icons';

export enum EditorFontSize {
  CUSTOM_FONT_SIZE_10px = '10',
  CUSTOM_FONT_SIZE_12px = '12',
  CUSTOM_FONT_SIZE_14px = '14',
  CUSTOM_FONT_SIZE_18px = '18',
  CUSTOM_FONT_SIZE_20px = '20',
  CUSTOM_FONT_SIZE_24px = '24',
  CUSTOM_FONT_SIZE_30px = '30',
  CUSTOM_FONT_SIZE_36px = '36',
}

export type InlineStyleOption = {
  id: string;
  icon: IconType;
  inlineStyleType: DraftInlineStyleType;
};

export type TextAlignment = 'left' | 'center' | 'right';
