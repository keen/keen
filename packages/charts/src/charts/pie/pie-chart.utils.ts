import { scaleOrdinal } from 'd3-scale';
import { sum } from 'd3-array';
import { arc, pie } from 'd3-shape';

import { Dimension, Margins } from '../../types';

export type LabelsPosition = 'inside' | 'outside';

export type Options = {
  data: Record<string, any>[];
  labelSelector: string;
  valueSelector: string;
  dimension: Dimension;
  margins: Margins;
  colors: string[];
  padAngle: number;
  innerRadius: number;
  labelsPosition: LabelsPosition;
};

type PieSlice = {
  index: string;
  label: string;
  labelPosition: [number, number];
  path: string;
  pathActive: string;
};

const HOVER_RADIUS = 20;

export const generatePieChart = ({
  data,
  colors,
  dimension,
  padAngle,
  innerRadius,
  labelSelector,
  valueSelector,
  labelsPosition,
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

  const createArc = arc().padAngle(padAngle);

  const labelRadiusModifier =
    labelsPosition === 'inside' ? (2 * radius) / 3 : radius + 4 * HOVER_RADIUS;

  const calculateLabelPosition = (startAngle: number, endAngle: number) => {
    return createArc.centroid({
      innerRadius: radius,
      outerRadius: labelRadiusModifier,
      startAngle,
      endAngle,
    });
  };

  const arcs: PieSlice[] = createPie(values).map(
    ({ startAngle, endAngle, value, index }) => {
      return {
        label: String(`${(Math.round(value * 100) / total).toFixed(1)}%`),
        labelPosition: calculateLabelPosition(startAngle, endAngle),
        index: String(index),
        path: createArc({
          startAngle,
          endAngle,
          innerRadius,
          outerRadius: radius,
        }),
        pathActive: createArc({
          startAngle,
          endAngle,
          innerRadius,
          outerRadius: radius + HOVER_RADIUS,
        }),
      };
    }
  );

  return {
    arcs,
    getColor: scaleOrdinal(colors),
  };
};
