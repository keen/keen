import { DataSelector, GroupMode, StackMode } from '../../../types';
export declare const getLabel: ({
  isPercentage,
  selector,
  data,
  percentageData,
}: {
  selector: DataSelector;
  isPercentage: boolean;
  data: Record<string, any>[];
  percentageData: Record<string, any>[];
}) => any;
export declare const getSelectors: ({
  groupMode,
  stackMode,
  keys,
  disabledKeys,
  colors,
  selector,
}: {
  groupMode: GroupMode;
  stackMode: StackMode;
  disabledKeys: string[];
  keys: string[];
  colors: string[];
  selector: {
    selector: DataSelector;
    color: string;
  };
}) => {
  selector: DataSelector;
  color: string;
}[];
