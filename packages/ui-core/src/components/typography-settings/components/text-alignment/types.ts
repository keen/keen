import { IconType } from '@keen.io/icons';

export type TextAlignment = 'left' | 'center' | 'right';

export type TextAlignmentOption = {
  id: string;
  icon: IconType;
  style: TextAlignment;
};
