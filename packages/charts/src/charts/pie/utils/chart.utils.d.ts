import { Dimension, Margins, DataSelector } from '../../../types';
export declare type LabelsPosition = 'inside' | 'outside';
export declare type Options = {
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
};
declare type PieSlice = {
  index: string;
  label: string;
  activePosition: [number, number];
  labelPosition: [number, number];
  color: string;
  selector: DataSelector;
  startAngle: number;
  endAngle: number;
};
export declare const HOVER_RADIUS = 5;
export declare const generatePieChart: ({
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
}: Options) => {
  arcs: PieSlice[];
  drawActiveArc: import('d3-shape').Arc<
    any,
    import('d3-shape').DefaultArcObject
  >;
  drawArc: import('d3-shape').Arc<any, import('d3-shape').DefaultArcObject>;
};
export {};
