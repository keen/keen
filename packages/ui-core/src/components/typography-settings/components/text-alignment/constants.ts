import { IconType } from '@keen.io/icons';
import { TextAlignmentOption } from './types';

export const ICON: Record<string, IconType> = {
  left: 'align-left',
  center: 'align-center',
  right: 'align-right',
};

export const OPTIONS: TextAlignmentOption[] = [
  {
    id: 'left',
    icon: 'align-left',
    style: 'left',
  },
  {
    id: 'center',
    icon: 'align-center',
    style: 'center',
  },
  {
    id: 'right',
    icon: 'align-right',
    style: 'right',
  },
];
