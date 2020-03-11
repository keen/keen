import { DataSelector } from '../../../types';
declare type Options = {
  data: Record<string, any>[];
  keys: string[];
  selectors: {
    selector: DataSelector;
    color: string;
  }[];
};
export declare const getTooltipContent: ({
  data,
  keys,
  selectors,
}: Options) => {
  name: string;
  value: number;
}[];
export {};
