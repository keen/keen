import { sum } from 'd3-array';
import { arc, pie } from 'd3-shape';
import { colors } from '@keen.io/colors';
import {
  getFromPath,
  calculateHypotenuse,
  getPaletteColor,
} from '@keen.io/charts-utils';

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

export const HOVER_RADIUS = 5;

export const OTHERS_DATA_KEY = 'Others';

export const createStackedSlice = ({
  slices,
  total,
  treshold,
  slicesToStack,
}: {
  slices: Slice[];
  total: number;
  treshold: number;
  slicesToStack: Slice[];
}) => {
  let filteredSlices: Slice[] = slices;
  const stackValue = slicesToStack.reduce(
    (total: number, element: Slice) => total + element.value,
    0
  );
  const stack = slicesToStack.map(({ color, selector }) => ({
    color,
    selector,
  }));

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

export const getSlicesToStack = ({
  slices = [],
  total,
  tresholdPercent,
}: {
  slices: Slice[];
  total: number;
  tresholdPercent: number;
}) => {
  return slices.filter(
    (slice) => (slice.value * 100) / total <= tresholdPercent
  );
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
  data.map((item) => {
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
        color: getPaletteColor(idx, colors),
      });
    }
  });

  const total = sum(slices, (d) => d.value);
  const createPie = pie().value((d: any) => d.value);

  const createArc = arc().padAngle(padAngle);

  const tresholdPercent = calculateTresholdPercent(total, treshold);

  const slicesToStack = getSlicesToStack({ slices, total, tresholdPercent });

  if (treshold > 0 && slicesToStack.length > 1) {
    slices = createStackedSlice({
      slices,
      treshold: tresholdPercent,
      total,
      slicesToStack,
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

  const arcs: Arc[] = [];

  const stackedElem: string[] = [];

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
        stack.forEach((el: { selector: DataSelector; color: string }) => {
          stackedElem.push(getFromPath(data, el.selector)[labelSelector]);
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

  return {
    total,
    arcs,
    stackedElem,
    drawArc: arc()
      .padAngle(padAngle)
      .innerRadius(relativeInnerRadius)
      .outerRadius(radius)
      .padRadius(padRadius)
      .cornerRadius(cornerRadius),
  };
};
