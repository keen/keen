import { Formatter } from '@keen.io/charts-utils';
import { Dimension, Margins, DataSelector } from '../../types';

export type LabelsPosition = 'inside' | 'outside';

export type SliceType = 'pie' | 'donut';

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
  formatValue?: Formatter;
  dataSeriesOffset?: [number, number];
};

export type Arc = {
  index: string;
  labelNumeric: string | number | Date | boolean;
  labelPercentage: string;
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

export type Slice = {
  color: string;
  value: number;
  dataKey: string;
  selector: DataSelector;
  stacked?: boolean;
  stack?: { selector: DataSelector; color: string }[];
  index?: number;
};

export type ArcProperties = {
  startAngle: number;
  endAngle: number;
};
