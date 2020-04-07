import React, { useContext } from 'react';

import { ChartContext, ChartContextType } from '../../contexts';
import { AxisTitle, Orientation } from '../../types';
import { Typography } from '@keen.io/ui-core';

import {
  calculateVerticalOffset,
  calculateHorizontalOffset,
  getTextAnchor,
} from './axis-title.utils';
import { X_AXIS_PADDING } from '../axes.component';

type Props = {
  axisTitle: AxisTitle;
  orientation: Orientation;
} & Typography;

const AXIS_TITLE_PADDING = 15;

const Title = ({ axisTitle, orientation, ...typography }: Props) => {
  const { theme, margins, svgDimensions } = useContext(
    ChartContext
  ) as ChartContextType;

  const axisTheme =
    orientation === Orientation.HORIZONTAL ? theme.axisX : theme.axisY;
  const { tickPadding = 0, tickSize = 0 } = axisTheme;
  const { value, alignment } = axisTitle;
  const { fontColor, ...typographyProps } = typography;

  const textSettings = {
    textAnchor: getTextAnchor(alignment),
    fill: fontColor || 'currentColor',
    x:
      orientation === Orientation.HORIZONTAL
        ? calculateHorizontalOffset(alignment, svgDimensions, margins)
        : calculateVerticalOffset(alignment, svgDimensions, margins),
    y:
      orientation === Orientation.HORIZONTAL
        ? svgDimensions.height -
          margins.bottom +
          2 * tickPadding +
          tickSize +
          AXIS_TITLE_PADDING +
          X_AXIS_PADDING
        : margins.left - tickSize - 2 * tickPadding - 2 * AXIS_TITLE_PADDING,
    style:
      orientation === Orientation.HORIZONTAL
        ? {}
        : {
            transform: 'rotate(-90deg)',
          },
  };

  return (
    <text {...textSettings} {...typographyProps}>
      {value}
    </text>
  );
};

export default Title;
