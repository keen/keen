import { IconType } from '@keen.io/icons';

export type FontStyles = {
  name: 'bold' | 'italic' | 'underline';
  icon: IconType;
};

export type TextAlignment = 'left' | 'center' | 'right';

export type FontSettings = {
  color: string;
  size: number;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  alignment: TextAlignment;
};
