import React, { useContext } from 'react';

import { ChartContext, ChartContextType } from '../contexts';
import { Orientation, Line as LineType } from '../types';

import {
  getTextAnchor,
  getVerticalPosition,
  getHorizontalPosition,
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
};

const AXIS_TITLE_PADDING = 20;

const AxisTitle = ({ children, orientation, line, groupBox }: Props) => {
  const { theme } = useContext(ChartContext) as ChartContextType;

  const axisTheme =
    orientation === Orientation.HORIZONTAL ? theme.axisX : theme.axisY;
  const { title } = axisTheme;
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
