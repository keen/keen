import React, { FC, useMemo } from 'react';
import { Typography } from '@keen.io/ui-core';
import { FormatFunction, getFromPath } from '@keen.io/charts-utils';

import Correlation from './correlation.component';

import { DataSelector } from '../../types';

type Props = {
  data: Record<string, any>[];
  typography: Typography;
  labelSelector: string;
  selectors: { selector: DataSelector; color: string }[];
  valueKey: string;
  xDomainKey: string;
  yDomainKey: string;
  formatValue?: Partial<{
    xKey: FormatFunction;
    yKey: FormatFunction;
    valueKey: FormatFunction;
  }>;
};

export const TooltipContent: FC<Props> = ({
  data,
  typography,
  labelSelector,
  selectors,
  valueKey,
  xDomainKey,
  yDomainKey,
  formatValue,
}) => {
  const [firstSelector] = selectors;
  const [index] = firstSelector.selector;

  const series = useMemo(() => {
    return selectors.map(({ color, selector }) => {
      const selectorData = getFromPath(data, selector);
      return {
        title: selectorData[labelSelector],
        color,
        correlations: Object.keys(selectorData).reduce((acc, keyName) => {
          let value = selectorData[keyName];

          if (formatValue?.xKey && keyName === xDomainKey)
            value = formatValue.xKey(selectorData[keyName]);
          if (formatValue?.yKey && keyName === yDomainKey)
            value = formatValue.yKey(selectorData[keyName]);
          if (formatValue?.valueKey && keyName === valueKey)
            value = formatValue.valueKey(selectorData[keyName]);

          if (keyName !== labelSelector) {
            return [
              ...acc,
              {
                name: keyName,
                value,
              },
            ];
          }

          return acc;
        }, []),
      };
    });
  }, [index]);

  return (
    <>
      {series.map(({ title, correlations, color }, idx) => (
        <Correlation
          key={`${title}-${idx}`}
          title={title}
          color={color}
          correlations={correlations}
          typography={typography}
          valueKey={valueKey}
        />
      ))}
    </>
  );
};

export default TooltipContent;
