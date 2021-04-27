import { transparentize } from 'polished';
import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import { Layout, SortMode } from '@keen.io/ui-core';
import { getPaletteColor } from '@keen.io/charts-utils';

import { GroupMode, StackMode, DataSelector } from '../../../types';
import { Bar } from '../types';

/**
 * Prepare a color based on groupMode and stackMode
 *
 * @param activeBar - selected bar with mouse hover
 * @param barKey - key of the bar
 * @param barSelector - selector of the bar
 * @param stackMode - stackMode option
 * @param groupMode - groupMode option
 * @param color - color of the bar
 * @return return a color
 *
 */

export const getBarColor = ({
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
}) => {
  if (groupMode === 'stacked' && stackMode === 'normal') {
    const [, activeProperty] = activeBar.selector;
    const [, barProperty] = barSelector;

    if (activeProperty === barProperty) {
      return color;
    }

    if (activeProperty) {
      return transparentize(0.4, color);
    }

    return color;
  }

  if (groupMode === 'stacked' && stackMode === 'percent') {
    const [activeIndex] = activeBar.selector;
    const [barIndex] = barSelector;

    if (activeIndex === barIndex) {
      return transparentize(0.05, color);
    }

    return color;
  }

  return activeBar.key === barKey ? transparentize(0.05, color) : color;
};

/**
 * Calculate bars data for chart
 *
 * @param data - data series
 * @param groupScale - band scale
 * @param keys - keys used for calculation
 * @param labelSelector - selected label from data
 * @param disabledKeys - keys disabled for calculation/display
 * @param range - array of booleans created based on yScale/xScale domain length
 * @param xScale - time/linear scale
 * @param yScale - time/linear scale
 * @param layout - plot layout
 * @param colors - array of colors
 * @param barsOrder - bars order
 * @return bars for chart
 *
 */

export const calculateGroupedBars = (
  data: Record<string, any>[],
  groupScale: ScaleBand<string>,
  keys: string[],
  labelSelector: string,
  disabledKeys: string[],
  range: boolean[],
  xScale:
    | ScaleBand<string | number>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>,
  yScale: ScaleBand<string | number> | ScaleLinear<number, number>,
  layout: Layout,
  colors: string[],
  barsOrder?: SortMode
) => {
  const barSize = groupScale.bandwidth();
  const keysOrder: Record<number, any> = {};

  if (barsOrder) {
    data.forEach((_item: Record<string, any>, idx: number) => {
      groupScale
        .domain()
        .sort((a, b) => {
          if (barsOrder === 'descending') {
            return data[idx]?.[b] - data[idx]?.[a];
          } else {
            return data[idx]?.[a] - data[idx]?.[b];
          }
        })
        .filter((keyName: string) => data[idx][keyName])
        .forEach((keyName: string, index: number) => {
          if (!keysOrder[idx]) keysOrder[idx] = {};
          keysOrder[idx][keyName] = index;
        });
    });
  }
  const bars = [] as Bar[];
  range.forEach((_d, index: number) => {
    let counter = 0;
    const barsToRenderInGroup = Object.entries(data[index]).filter(
      (el) => el[1] !== 0 && el[0] !== labelSelector
    ).length;

    const newOrder = (keys.length - barsToRenderInGroup) / 2;

    keys.forEach((keyName: string, idx: number) => {
      const isDisabled =
        keyName === labelSelector || disabledKeys.includes(keyName);

      const value = data[index]?.[keyName];
      if (value && !isDisabled) {
        const orderPosition = barsOrder
          ? keysOrder[index][keyName] + newOrder
          : counter + newOrder;

        const bar =
          layout === 'vertical'
            ? {
                x: xScale(data[index][labelSelector]) + barSize * orderPosition,
                y: value > 0 ? yScale(value) : yScale(0),
                width: barSize,
                height: Math.abs(yScale(value) - yScale(0)),
              }
            : {
                x: value > 0 ? Math.abs(xScale(0)) : xScale(value),
                y: yScale(data[index][labelSelector]) + barSize * orderPosition,
                width: Math.abs(xScale(value) - xScale(0)),
                height: barSize,
              };

        bars.push({
          key: `${index}.${keyName}`,
          selector: [index, keyName],
          color: getPaletteColor(idx, colors),
          value,
          ...bar,
        });
      }
      if (!barsOrder && !disabledKeys.includes(keyName) && value) counter++;
    });
  });

  return bars;
};
