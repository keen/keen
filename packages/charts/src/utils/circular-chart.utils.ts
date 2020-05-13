import { sum } from 'd3-array';
import { arc, pie } from 'd3-shape';
import { colors } from '@keen.io/colors';

import { getFromPath } from './selectors.utils';

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
  treshold?: number;
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

type Selector = {
  selector: number[];
  color: string;
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

  return filteredSlices;
};

export const calculateTresholdPercent = (
  total: number,
  treshold: number
): number => {
  return (treshold * 100) / total;
};

export const calculateTotalValue = (
  data: Record<string, any>[],
  labelSelector: string,
  keys: string[]
): number => {
  let total = 0;
  data.map(item => {
    const label = item[labelSelector];
    const result = keys.reduce((acc, currentKey) => {
      if (currentKey !== label) return acc + item[currentKey];
      return acc;
    }, 0) as number;
    total += result;
  });
  return total;
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
  treshold,
}: Options) => {
  let slices: Slice[] = [];
  const dataKeys: Record<string, any>[] = [];

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

  const tresholdPercent = calculateTresholdPercent(total, treshold);

  if (treshold > 0 && tresholdPercent < 100) {
    slices = createStackedSlice({
      slices,
      treshold: tresholdPercent,
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

  const stackedLabels: string[] = [];

  const arcs: Arc[] = [];

  createPie(slices as any).forEach(
    ({ startAngle, endAngle, value, index, data: sliceData }) => {
      const { color, selector, stacked, stack, dataKey } = sliceData as any;
      const [x, y] = createArc.centroid({
        innerRadius: relativeInnerRadius,
        outerRadius: 0,
        startAngle,
        endAngle,
      });

      if (stacked) {
        stack.forEach((el: Selector) => {
          const { name } = getFromPath(data, el.selector);
          stackedLabels.push(name);
        });
      }

      if (value > 0) {
        arcs.push({
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
        });
      }
    }
  );

  data.forEach(({ name }: { name: string }) => {
    if (!stackedLabels.includes(name)) {
      dataKeys.push({ [labelSelector]: name });
    }
  });

  stackedLabels.length &&
    dataKeys.push({
      [labelSelector]: stackedLabels,
    });

  return {
    total,
    arcs,
    dataKeys,
    drawArc: arc()
      .padAngle(padAngle)
      .innerRadius(relativeInnerRadius)
      .outerRadius(radius)
      .padRadius(padRadius)
      .cornerRadius(cornerRadius),
  };
};
