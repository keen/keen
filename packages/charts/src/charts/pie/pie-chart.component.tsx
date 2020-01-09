import React, { FC } from 'react';

import { generatePieChart } from './pie-chart.utils';

import PieSlice from './pie-slice.component';
import ShadowFilter from './shadow-filter.component';

import { ChartBase } from '../../components';

import { CommonChartSettings } from '../../types';

type Props = {
  /** Chart data */
  data: object[];
  /** Name of data object property used to create series */
  labelSelector?: string;
  /** Name of data object property used to create values */
  valueSelector?: string;
  /** Spacing between pie slices */
  padAngle?: number;
  /** Radius of inner circle */
  innerRadius?: number;
} & CommonChartSettings;

export const PieChart: FC<Props> = ({
  data,
  margins,
  svgDimensions,
  theme,
  labelSelector = 'name',
  valueSelector = 'value',
  padAngle = 0.01,
  innerRadius = 30,
}) => {
  const {
    arcs,
    getColor,
    drawArc,
    drawActiveArc,
    calculateLabelPosition,
  } = generatePieChart({
    data,
    margins,
    padAngle,
    innerRadius,
    labelSelector,
    valueSelector,
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
        {arcs.map(({ startAngle, endAngle, index, label }) => (
          <PieSlice
            key={index}
            draw={drawArc}
            label={label}
            getLabelPosition={calculateLabelPosition}
            drawActive={drawActiveArc}
            startAngle={startAngle}
            endAngle={endAngle}
            color={getColor(index)}
          />
        ))}
      </g>
    </ChartBase>
  );
};

export default PieChart;
