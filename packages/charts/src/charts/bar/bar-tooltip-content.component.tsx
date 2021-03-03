import React, { FC, useContext } from 'react';
import { Text, BulletList } from '@keen.io/ui-core';
import {
  getFromPath,
  getKeysDifference,
  transformToPercent,
  formatScaleLabel,
} from '@keen.io/charts-utils';

import { getLabel } from './utils/tooltip.utils';

import { ChartContext, ChartContextType } from '../../contexts';

import {
  DataSelector,
  GroupMode,
  StackMode,
  TooltipFormatter,
} from '../../types';
// import { getTooltipContent } from '../../utils';

type Props = {
  /** Data series */
  data: Record<string, any>[];
  /** Collection of all keys used from data series */
  keys: string[];
  /** Collection of disabled keys */
  disabledKeys: string[];
  /** Selectors used to pick data from series */
  selectors: { selector: DataSelector; color: string }[];
  /** Group mode configuration */
  groupMode: GroupMode;
  /** Stack mode configuration */
  stackMode: StackMode;
  /** List indicator */
  isList: boolean;
  /** Name of data object property used to create labels on axis */
  labelSelector: string;
  /** Tooltip formatter */
  formatValue?: TooltipFormatter;
};

const BarTooltip: FC<Props> = ({
  data,
  keys,
  disabledKeys,
  selectors,
  stackMode,
  groupMode,
  isList,
  labelSelector,
  formatValue,
}) => {
  const {
    theme: { tooltip },
    xScaleSettings,
  } = useContext(ChartContext) as ChartContextType;

  const isPercentage = stackMode === 'percent' && groupMode === 'stacked';
  const percentageData = isPercentage
    ? transformToPercent(data, getKeysDifference(keys, disabledKeys))
    : [];
  console.log({ selectors, data, keys, xScaleSettings });
  const index = selectors[0].selector[0] as number;

  const scaleLabel = formatScaleLabel(
    data[index][labelSelector],
    xScaleSettings
  );

  const total = keys.reduce((acc: number, keyName: string) => {
    return acc + data[index][keyName];
  }, 0);

  const percent = isPercentage
    ? selectors.reduce((acc, { selector }) => {
        return (
          acc + parseFloat(getFromPath(percentageData, selector).toFixed(2))
        );
      }, 0)
    : null;

  return (
    <div data-testid="bar-tooltip">
      {isList ? (
        <>
          <span>{scaleLabel}</span>
          <BulletList
            // typography={tooltip.labels.typography}
            items={selectors.map(({ color, selector }) => ({
              data: `${selector[1]}: ${getLabel({
                data,
                selector,
                percentageData,
                isPercentage,
                formatValue,
              })}`,
              // value: getLabel({
              //   data,
              //   selector,
              //   percentageData,
              //   isPercentage,
              //   formatValue,
              // }),
              color,
            }))}
            renderItem={(_idx, item) => (
              <Text {...tooltip.labels.typography}>{item.data}</Text>
            )}
          />
          <span>
            total : {total} {percent && `(${percent.toFixed(2)}%)`}
          </span>
        </>
      ) : (
        <>
          <BulletList
            items={selectors.map(({ selector, color }) => ({
              data: {
                label: selector[1],
                value: formatValue
                  ? formatValue(getFromPath(data, selector))
                  : getFromPath(data, selector),
              },
              color,
            }))}
            renderItem={(_idx, item) => (
              <>
                <Text {...tooltip.labels.typography}>{item.data.label}</Text>
                <Text {...tooltip.values.typography}>{item.data.value}</Text>
              </>
            )}
          />
          {/* {selectors.map(({ selector, color }) => (
            <Text {...tooltip.labels.typography} key={color}>
              {formatValue
                ? formatValue(getFromPath(data, selector))
                : getFromPath(data, selector)}
            </Text>
          ))} */}
        </>
      )}
    </div>
  );
};

export default BarTooltip;
