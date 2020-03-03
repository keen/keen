import { sum } from 'd3-array';
import { arc, pie } from 'd3-shape';

import { calculateHypotenuse } from '../../../utils/math.utils';

import { Dimension, Margins, DataSelector } from '../../../types';

export type LabelsPosition = 'inside' | 'outside';

export type Options = {
  data: Record<string, any>[];
  labelSelector: string;
  keys: string[];
  disabledLabels: string[];
  dimension: Dimension;
  margins: Margins;
  colors: string[];
  padAngle: number;
  innerRadius: number;
  labelsRadius: number;
  labelsPosition: LabelsPosition;
};

type PieSlice = {
  index: string;
  label: string;
  labelPosition: [number, number];
  color: string;
  selector: DataSelector;
  startAngle: number;
  endAngle: number;
};

type PieValue = { color: string; value: number; selector: DataSelector };

export const HOVER_RADIUS = 10;

export const generatePieChart = ({
  data,
  colors,
  dimension,
  padAngle,
  innerRadius,
  labelSelector,
  keys,
  disabledLabels,
  labelsPosition,
  labelsRadius,
  margins,
}: Options) => {
  const values: PieValue[] = [];

  const { width, height } = dimension;
  const radius =
    Math.min(
      width - margins.left - margins.right,
      height - margins.top - margins.bottom
    ) / 2;

  data.forEach((item, idx) => {
    const label = item[labelSelector];
    if (!disabledLabels.includes(label)) {
      const result = keys.reduce((acc, currentKey) => {
        if (currentKey !== label) return acc + item[currentKey];
        return acc;
      }, 0) as number;

      values.push({
        value: result,
        selector: [idx],
        color: colors[idx],
      });
    }
  });

  const total = sum(values, d => d.value);
  const createPie = pie().value((d: any) => d.value);

  const createArc = arc().padAngle(padAngle);

  const calculateLabelPosition = (
    startAngle: number,
    endAngle: number
  ): [number, number] => {
    const [x, y] = createArc.centroid({
      innerRadius: innerRadius,
      outerRadius: radius + labelsRadius,
      startAngle,
      endAngle,
    });

    if (labelsPosition === 'outside') {
      return calculateHypotenuse(x, y, radius + labelsRadius);
    }

    return [x, y];
  };

  const arcs: PieSlice[] = createPie(values as any).map(
    ({ startAngle, endAngle, value, index, data }) => {
      const { color, selector } = data as any;

      return {
        label: String(`${(Math.round(value * 100) / total).toFixed(1)}%`),
        labelPosition: calculateLabelPosition(startAngle, endAngle),
        index: String(index),
        selector,
        color,
        startAngle,
        endAngle,
      };
    }
  );

  return {
    arcs,
    drawActiveArc: arc()
      .padAngle(padAngle)
      .innerRadius(innerRadius)
      .outerRadius(radius + HOVER_RADIUS),
    drawArc: arc()
      .padAngle(padAngle)
      .innerRadius(innerRadius)
      .outerRadius(radius),
  };
};
