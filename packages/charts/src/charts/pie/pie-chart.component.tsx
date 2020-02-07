import React, { FC } from 'react';

import { generatePieChart, LabelsPosition } from './pie-chart.utils';

import PieSlice from './pie-slice.component';
import ShadowFilter from './shadow-filter.component';

import { ChartBase } from '../../components';

import { theme as defaultTheme } from '../../theme';

import { CommonChartSettings } from '../../types';

export type Props = {
  /** Chart data */
  data: object[];
  /** Name of data object property used to create series */
  labelSelector?: string;
  /** Keys picked from data object used to genrate slices */
  keys?: string[];
  /** Spacing between pie slices */
  padAngle?: number;
  /** Radius of inner circle */
  innerRadius?: number;
  /** Show labels inside our outside pie slices */
  labelsPosition?: LabelsPosition;
  /** Automatically adjust labels color */
  labelsAutocolor?: boolean;
} & CommonChartSettings;

export const PieChart: FC<Props> = ({
  data,
  svgDimensions,
  theme = defaultTheme,
  margins = { top: 30, right: 20, bottom: 30, left: 40 },
  labelSelector = 'name',
  keys = ['value'],
  padAngle = 0.01,
  innerRadius = 20,
  labelsPosition = 'inside',
  labelsAutocolor = true,
}) => {
  const { arcs, getColor } = generatePieChart({
    data,
    margins,
    padAngle,
    innerRadius,
    labelSelector,
    keys,
    labelsPosition,
    dimension: svgDimensions,
    colors: theme.colors,
  });

  return (
    <ChartBase theme={theme} svgDimensions={svgDimensions} margins={margins}>
      <g
        style={{
          transform: `translate(${svgDimensions.width /
            2}px, ${svgDimensions.height / 2}px)`,
        }}
      >
        <ShadowFilter />
        {arcs.map(({ index, path, pathActive, label, labelPosition }) => (
          <PieSlice
            key={index}
            path={path}
            pathActive={pathActive}
            label={label}
            autocolor={labelsAutocolor}
            labelPosition={labelPosition}
            background={getColor(index)}
          />
        ))}
      </g>
    </ChartBase>
  );
};

export default PieChart;
