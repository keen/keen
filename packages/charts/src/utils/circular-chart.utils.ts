import { sum } from 'd3-array';
import { arc, pie } from 'd3-shape';
import { colors } from '@keen.io/colors';

import { calculateHypotenuse } from './math.utils';

import { Dimension, Margins, DataSelector } from '../types';

export type LabelsPosition = 'inside' | 'outside';

type SliceType = 'pie' | 'donut';

export type Options = {
  data: Record<string, any>[];
  labelSelector: string;
  keys: string[];
  disabledLabels: string[];
  dimension: Dimension;
  margins: Margins;
  colors: string[];
  padAngle: number;
  padRadius: number;
  cornerRadius: number;
  innerRadius: number;
  labelsRadius: number;
  labelsPosition: LabelsPosition;
  type?: SliceType;
  stackTreshold?: number;
};

type Arc = {
  index: string;
  label: string;
  activePosition: [number, number];
  labelPosition: [number, number];
  color: string;
  selector: DataSelector;
  dataKey: string;
  startAngle: number;
  endAngle: number;
  stacked: boolean;
  stack: { selector: DataSelector; color: string }[];
};

type Slice = {
  color: string;
  value: number;
  dataKey: string;
  selector: DataSelector;
  stacked?: boolean;
  stack?: { selector: DataSelector; color: string }[];
};

export const HOVER_RADIUS = 5;

export const OTHERS_DATA_KEY = 'Others';

export const createStackedSlice = ({
  slices,
  total,
  treshold,
}: {
  slices: Slice[];
  total: number;
  treshold: number;
}) => {
  const stack: { selector: DataSelector; color: string }[] = [];
  let filteredSlices: Slice[] = slices;
  let stackValue = 0;

  slices.forEach(({ value, selector, color }) => {
    if ((value * 100) / total <= treshold) {
      stackValue = stackValue + value;
      stack.push({ selector, color });
    }
  });

  const shouldComputeSlices = stack.length >= 2 && slices.length > 3;

  if (shouldComputeSlices) {
    filteredSlices = slices.filter(
      ({ value }) => (value * 100) / total > treshold
    );

    filteredSlices.push({
      color: colors.gray['500'],
      dataKey: OTHERS_DATA_KEY,
      value: stackValue,
      selector: [],
      stacked: true,
      stack,
    });
  }

  return filteredSlices;
};

export const generateCircularChart = ({
  data,
  colors,
  dimension,
  padAngle,
  padRadius,
  cornerRadius,
  innerRadius,
  labelSelector,
  keys,
  disabledLabels,
  labelsPosition,
  labelsRadius,
  margins,
  type = 'pie',
  stackTreshold = 0,
}: Options) => {
  let slices: Slice[] = [];

  const { width, height } = dimension;
  const radius =
    Math.min(
      width - margins.left - margins.right,
      height - margins.top - margins.bottom
    ) / 2;

  const relativeInnerRadius = radius * Math.min(innerRadius, 1);

  data.forEach((item, idx) => {
    const label = item[labelSelector];
    if (!disabledLabels.includes(label)) {
      const result = keys.reduce((acc, currentKey) => {
        if (currentKey !== label) return acc + item[currentKey];
        return acc;
      }, 0) as number;

      slices.push({
        value: result,
        dataKey: label,
        selector: [idx],
        color: colors[idx],
      });
    }
  });

  const total = sum(slices, d => d.value);
  const createPie = pie().value((d: any) => d.value);

  const createArc = arc().padAngle(padAngle);

  if (stackTreshold > 0 && stackTreshold < 100) {
    slices = createStackedSlice({
      slices,
      treshold: stackTreshold,
      total,
    });
  }

  const calculateLabelPosition = (
    startAngle: number,
    endAngle: number
  ): [number, number] => {
    const [x, y] = createArc.centroid({
      innerRadius: relativeInnerRadius,
      outerRadius: type === 'donut' ? radius : radius + labelsRadius,
      startAngle,
      endAngle,
    });

    if (labelsPosition === 'outside') {
      return calculateHypotenuse(x, y, radius + labelsRadius);
    }

    return [x, y];
  };

  const arcs: Arc[] = createPie(slices as any).map(
    ({ startAngle, endAngle, value, index, data }) => {
      const { color, selector, stacked, stack, dataKey } = data as any;
      const [x, y] = createArc.centroid({
        innerRadius: relativeInnerRadius,
        outerRadius: 0,
        startAngle,
        endAngle,
      });

      return {
        label: String(`${(Math.round(value * 100) / total).toFixed(1)}%`),
        labelPosition: calculateLabelPosition(startAngle, endAngle),
        activePosition: [x, y],
        index: String(index),
        dataKey,
        selector,
        color,
        startAngle,
        endAngle,
        stacked,
        stack,
      };
    }
  );

  return {
    total,
    arcs,
    drawArc: arc()
      .padAngle(padAngle)
      .innerRadius(relativeInnerRadius)
      .outerRadius(radius)
      .padRadius(padRadius)
      .cornerRadius(cornerRadius),
  };
};
