import React, { useContext } from 'react';

import { ChartContext, ChartContextType } from '../contexts';
import { Orientation, Line as LineType } from '../types';
import { Layout } from '@keen.io/ui-core';

import {
  getTextAnchor,
  getVerticalPosition,
  getHorizontalPosition,
  getAxisTheme,
} from './axis-title.utils';

type GroupBox = {
  x: number;
  y: number;
  height: number;
};

type Props = {
  children: string;
  orientation: Orientation;
  line: LineType;
  groupBox: GroupBox;
  layout?: Layout;
};

const AXIS_TITLE_PADDING = 20;

const AxisTitle = ({
  children,
  orientation,
  line,
  groupBox,
  layout,
}: Props) => {
  const { theme } = useContext(ChartContext) as ChartContextType;

  const { title } = getAxisTheme(layout, orientation, theme);
  const { alignment, typography } = title;
  const { fontColor, ...typographyProps } = typography;
  const { x, y, height } = groupBox;

  const textSettings = {
    textAnchor: getTextAnchor(alignment),
    fill: fontColor || 'currentColor',
    x:
      orientation === Orientation.HORIZONTAL
        ? getHorizontalPosition(alignment, line)
        : getVerticalPosition(alignment, line),
    y:
      orientation === Orientation.HORIZONTAL
        ? y + height + AXIS_TITLE_PADDING
        : x - AXIS_TITLE_PADDING,
    style:
      orientation === Orientation.HORIZONTAL
        ? {}
        : {
            transform: 'rotate(-90deg)',
          },
  };

  return (
    <text {...textSettings} {...typographyProps}>
      {children}
    </text>
  );
};

export default AxisTitle;
