import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';
import { Position } from '@keen.io/ui-core';
import { IconType } from '@keen.io/icons';

type ButtonSettings = {
  position: Position;
  icon: IconType;
  shadow: string;
  gradient: string;
};

type Settings = {
  buttonVariant: 'vertical' | 'horizontal';
  nextButton: ButtonSettings;
  previousButton: ButtonSettings;
};

export const sliderSettings: Record<'vertical' | 'horizontal', Settings> = {
  vertical: {
    buttonVariant: 'horizontal',
    previousButton: {
      position: 'top',
      icon: 'caret-up',
      gradient: 'to bottom',
      shadow: `0px 10px 5px ${transparentize(0.1, colors.white['500'])}`,
    },
    nextButton: {
      position: 'bottom',
      icon: 'caret-down',
      gradient: 'to top',
      shadow: `0px -10px 5px ${transparentize(0.1, colors.white['500'])}`,
    },
  },
  horizontal: {
    buttonVariant: 'vertical',
    previousButton: {
      position: 'left',
      icon: 'caret-left',
      gradient: 'to right',
      shadow: `6px 0px 5px ${transparentize(0.1, colors.white['500'])}`,
    },
    nextButton: {
      position: 'right',
      icon: 'caret-right',
      gradient: 'to left',
      shadow: `-6px 0px 5px ${transparentize(0.1, colors.white['500'])}`,
    },
  },
};
