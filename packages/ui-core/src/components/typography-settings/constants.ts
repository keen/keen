import { FontStyles } from './types';

export const DEFAULT_FONT_SIZE = 20;
export const DEFAULT_FONT_SIZES = [10, 12, 14, 18, 20, 24, 30, 36];

export const FONT_STYLES: FontStyles[] = [
  {
    icon: 'bold-text',
    name: 'bold',
  },
  {
    icon: 'italic-text',
    name: 'italic',
  },
  {
    icon: 'underline-text',
    name: 'underline',
  },
];

export const DEFAULT_AVAILABLE_SETTINGS = {
  color: true,
  fontSize: true,
  bold: true,
  italic: true,
  underline: true,
  alignment: true,
};
