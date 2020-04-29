import React from 'react';

import { Orientation, Line as LineType } from '../types';

import {
  getTextAnchor,
  getVerticalPosition,
  getHorizontalPosition,
} from './axis-title.utils';

import { AxisTitle } from '../types';

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
  titleSettings: AxisTitle;
};

const AXIS_TITLE_PADDING = 20;

const AxisTitle = ({
  children,
  orientation,
  line,
  groupBox,
  titleSettings,
}: Props) => {
  const { alignment, typography } = titleSettings;
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
