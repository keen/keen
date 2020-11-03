import React, { FC, useMemo } from 'react';
import { Typography } from '@keen.io/ui-core';
import { getFromPath } from '@keen.io/charts-utils';

import Correlation from './correlation.component';

import { DataSelector, TooltipFormatter } from '../../types';

type Props = {
  data: Record<string, any>[];
  typography: Typography;
  labelSelector: string;
  selectors: { selector: DataSelector; color: string }[];
  valueKey: string;
  xDomainKey: string;
  yDomainKey: string;
  formatTooltip?: {
    xKey?: TooltipFormatter;
    yKey?: TooltipFormatter;
    valueKey?: TooltipFormatter;
  };
};

export const TooltipContent: FC<Props> = ({
  data,
  typography,
  labelSelector,
  selectors,
  valueKey,
  xDomainKey,
  yDomainKey,
  formatTooltip,
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

          if (formatTooltip?.xKey && keyName === xDomainKey)
            value = formatTooltip.xKey(selectorData[keyName]);
          if (formatTooltip?.yKey && keyName === yDomainKey)
            value = formatTooltip.yKey(selectorData[keyName]);
          if (formatTooltip?.valueKey && keyName === valueKey)
            value = formatTooltip.valueKey(selectorData[keyName]);

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
