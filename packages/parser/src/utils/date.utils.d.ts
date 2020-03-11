/// <reference types="react" />
/// <reference types="@emotion/core" />
import { TimePrecision } from '@keen.io/charts';
export declare const createLabelFormatter: (
  precision: TimePrecision
) => (label: import('react').ReactText) => import('react').ReactText;
