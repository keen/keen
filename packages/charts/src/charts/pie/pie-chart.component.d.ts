import { FC } from 'react';
import { LabelsPosition } from './utils';
import { CommonChartSettings } from '../../types';
export declare type Props = {
  data: object[];
  labelSelector?: string;
  keys?: string[];
  disabledLabels?: string[];
  padAngle?: number;
  padRadius?: number;
  cornerRadius?: number;
  innerRadius?: number;
  labelsRadius?: number;
  labelsPosition?: LabelsPosition;
  labelsAutocolor?: boolean;
} & CommonChartSettings;
export declare const tooltipMotion: {
  transition: {
    duration: number;
  };
  exit: {
    opacity: number;
  };
};
export declare const PieChart: FC<Props>;
export default PieChart;
