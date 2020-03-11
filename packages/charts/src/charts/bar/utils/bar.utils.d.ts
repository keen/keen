import { GroupMode, StackMode } from '../../../types';
import { DataSelector } from '../../../types';
export declare const getBarColor: ({
  activeBar,
  barKey,
  barSelector,
  stackMode,
  groupMode,
  color,
}: {
  groupMode: GroupMode;
  stackMode: StackMode;
  color: string;
  barKey: string;
  barSelector: DataSelector;
  activeBar: {
    selector: DataSelector;
    key: string;
  };
}) => string;
