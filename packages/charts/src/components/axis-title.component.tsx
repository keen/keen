import React from 'react';

import { Orientation, Line } from '../types';

import {
  getTextAnchor,
  getVerticalPosition,
  getHorizontalPosition,
} from './axis-title.utils';

import { AxisTitle as AxisTitleSettings } from '../types';

type Props = {
  children: React.ReactNode;
  orientation: Orientation;
  line: Line;
  groupBox: Partial<DOMRect>;
  titleSettings: AxisTitleSettings;
};

const AxisTitle = ({
  children,
  orientation,
  line,
  groupBox,
  titleSettings,
}: Props) => {
  const { alignment, typography, padding } = titleSettings;
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
        ? y + height + padding
        : x - padding,
    style:
      orientation === Orientation.HORIZONTAL
        ? {}
        : {
            transform: 'rotate(-90deg)',
          },
  };

  return (
    <text
      {...textSettings}
      {...typographyProps}
      data-elementid={`${orientation}-axis-title`}
    >
      {children}
    </text>
  );
};

export default AxisTitle;
