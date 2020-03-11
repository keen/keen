/// <reference types="react" />
/// <reference types="@emotion/core" />
import { ScaleSettings } from '../types';
export declare const formatNumber: (
  value: number,
  precision?: number
) => string;
export declare const formatText: (
  value: string | number | Date,
  scaleSettings?: ScaleSettings
) => import('react').ReactText;
