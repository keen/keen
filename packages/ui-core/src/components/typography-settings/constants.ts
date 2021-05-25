import { InlineStyleOption } from './types';

export const DEFAULT_FONT_SIZE = '20';

export const INLINE_OPTIONS: InlineStyleOption[] = [
  {
    id: 'bold',
    icon: 'bold-text',
    inlineStyleType: 'BOLD',
  },
  {
    id: 'italic',
    icon: 'italic-text',
    inlineStyleType: 'ITALIC',
  },
  {
    id: 'underline',
    icon: 'underline-text',
    inlineStyleType: 'UNDERLINE',
  },
];
