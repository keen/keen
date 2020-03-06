import ArrowUp from './arrow-up.component';
import ArrowDown from './arrow-down.component';
import CaretLeft from './caret-left.component';
import CaretRight from './caret-right.component';
import CaretUp from './caret-up.component';
import CaretDown from './caret-down.component';
import Brand from './brand.component';

import { IconType } from '../types';

export const getIcon = (type: IconType) => {
  switch (type) {
    case 'arrow-down':
      return ArrowDown;
    case 'arrow-up':
      return ArrowUp;
    case 'caret-down':
      return CaretDown;
    case 'caret-up':
      return CaretUp;
    case 'caret-left':
      return CaretLeft;
    case 'caret-right':
      return CaretRight;
    case 'brand':
      return Brand;
  }
};
