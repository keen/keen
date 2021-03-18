import { DataSelector, GroupMode } from '../../../types';

/**
 * Prepare selectors for bar while mouse hover
 *
 * @param groupMode - groupMode option
 * @param keys - keys for the calculations
 * @param disabledKeys - keys disabled for calculation/display
 * @param colors - colors array
 * @param selector - color of the bar
 * @return return an array of DataSelector objects with a color
 *
 */
export const getSelectors = ({
  groupMode,
  keys,
  disabledKeys,
  colors,
  selector,
}: {
  groupMode: GroupMode;
  disabledKeys: string[];
  keys: string[];
  colors: string[];
  selector: { selector: DataSelector; color: string };
}): { selector: DataSelector; color: string }[] => {
  if (groupMode === 'stacked') {
    const { selector: dataSelector } = selector;
    const [index] = dataSelector;
    const selectors: { selector: DataSelector; color: string }[] = [];

    keys.forEach((key: string, idx: number) => {
      if (!disabledKeys.includes(key)) {
        selectors.push({
          selector: [index, key],
          color: colors[idx],
        });
      }
    });

    return selectors;
  }

  return [selector];
};
