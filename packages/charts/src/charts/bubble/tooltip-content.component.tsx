import React, { FC, useMemo } from 'react';
import { Typography } from '@keen.io/ui-core';

import Correlation from './correlation.component';
import { getFromPath } from '../../utils/selectors.utils';
import { formatTooltipValue } from '../../utils/tooltip.utils';

import { DataSelector, ScaleSettings } from '../../types';

type Props = {
  data: Record<string, any>[];
  typography: Typography;
  labelSelector: string;
  valueKey: string;
  selectors: { selector: DataSelector; color: string }[];
  yScaleSettings?: ScaleSettings;
  yDomainKey?: string;
};

export const TooltipContent: FC<Props> = ({
  data,
  typography,
  labelSelector,
  selectors,
  valueKey,
  yScaleSettings,
  yDomainKey,
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
          if (keyName !== labelSelector) {
            return [
              ...acc,
              {
                name: keyName,
                value:
                  keyName === yDomainKey
                    ? formatTooltipValue(
                        selectorData[keyName],
                        yScaleSettings?.formatLabel
                      )
                    : selectorData[keyName],
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
