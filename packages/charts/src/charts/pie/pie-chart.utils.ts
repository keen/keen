import { scaleOrdinal } from 'd3-scale';
import { sum } from 'd3-array';
import { arc, pie } from 'd3-shape';

import { Dimension, Margins } from '../../types';

type Options = {
  data: Record<string, any>[];
  labelSelector: string;
  valueSelector: string;
  dimension: Dimension;
  margins: Margins;
  colors: string[];
  padAngle: number;
  innerRadius: number;
};

type PieSlice = {
  index: string;
  label: string;
  startAngle: number;
  endAngle: number;
};

const HOVER_RADIUS = 30;

export const generatePieChart = ({
  data,
  colors,
  dimension,
  padAngle,
  innerRadius,
  labelSelector,
  valueSelector,
  margins,
}: Options) => {
  const labels: string[] = [];
  const values: number[] = [];

  const { width, height } = dimension;
  const radius =
    Math.min(
      width - margins.left - margins.right,
      height - margins.top - margins.bottom
    ) / 2;

  data.forEach(item => {
    labels.push(item[labelSelector]);
    values.push(item[valueSelector]);
  });

  const total = sum(values);
  const createPie = pie();

  const drawArc = arc()
    .padAngle(padAngle)
    .innerRadius(innerRadius)
    .outerRadius(radius);

  const drawActiveArc = arc()
    .padAngle(padAngle)
    .innerRadius(innerRadius)
    .outerRadius(radius + HOVER_RADIUS);

  const calculateLabelPosition = (startAngle: number, endAngle: number) => {
    return drawArc.centroid({
      innerRadius,
      outerRadius: radius,
      startAngle,
      endAngle,
    });
  };

  const arcs: PieSlice[] = createPie(values).map(
    ({ startAngle, endAngle, value, index }) => {
      return {
        label: String(`${(Math.round(value * 100) / total).toFixed(1)}%`),
        index: String(index),
        startAngle,
        endAngle,
      };
    }
  );

  return {
    arcs,
    getColor: scaleOrdinal(colors),
    calculateLabelPosition,
    drawArc,
    drawActiveArc,
  };
};
