import { FC } from 'react';
import { CommonChartSettings } from '../../types';
export declare const textMotion: {
  initial: {
    opacity: number;
  };
  animate: {
    opacity: number;
  };
  transition: {
    duration: number;
    delay: number;
  };
  exit: {};
};
export declare const decreaseMotion: {
  initial: {
    opacity: number;
    y: number;
  };
  animate: {
    opacity: number;
    y: number;
  };
  transition: {
    duration: number;
  };
  exit: {};
};
export declare const increaseMotion: {
  initial: {
    opacity: number;
    y: number;
  };
  animate: {
    opacity: number;
    y: number;
  };
  transition: {
    duration: number;
  };
  exit: {};
};
export declare type Props = {
  data: object[];
  labelSelector?: string;
  keys?: string[];
  labelPrefix?: string;
  labelSuffix?: string;
  type?: 'percent' | 'difference' | 'compare';
} & CommonChartSettings;
export declare const MetricChart: FC<Props>;
export default MetricChart;
