import React, { FC, useMemo } from 'react';
import { Tooltip as BaseTooltip, TooltipMode, Text } from '@keen.io/ui-core';
import {
  formatValue as valueFormatter,
  TooltipFormatter,
} from '@keen.io/charts-utils';

import {
  PartialsContainer,
  Value,
  TotalContainer,
  PartialItem,
} from './tooltip.styles';
import { calculatePartialPercents } from './tooltip.utils';

import { Tooltip as TooltipTheme } from '../../../../types';

type Props = {
  /** Geographical name */
  geographicalName: string;
  /** Total value for geographical area */
  totalValue: number;
  /** Tooltip theme */
  theme: Pick<TooltipTheme, 'labels'>;
  /** Tooltip mode */
  mode?: TooltipMode;
  /** Components used to calculate total value for geographical area */
  partialValues?: Record<string, number>;
  /** Function or pattern used for formatting tooltip value */
  formatValue?: TooltipFormatter;
};

export const Tooltip: FC<Props> = ({
  geographicalName,
  totalValue,
  theme,
  partialValues,
  formatValue,
  mode = 'dark',
}) => {
  const partialElements = useMemo(() => {
    if (partialValues) {
      return calculatePartialPercents(totalValue, partialValues);
    }

    return null;
  }, [geographicalName, totalValue, partialValues]);

  return (
    <BaseTooltip mode={mode} hasArrow={false} hasSpacing={false}>
      <TotalContainer>
        <Text htmlElement="span" {...theme.labels.typography}>
          {geographicalName}:
        </Text>{' '}
        <Value>
          <Text {...theme.labels.typography}>
            {valueFormatter(totalValue, formatValue)}
          </Text>
        </Value>
      </TotalContainer>
      {partialElements && (
        <PartialsContainer>
          {partialElements.map(({ label, value, percentValue }) => (
            <PartialItem key={`${label}-${value}`}>
              <Text {...theme.labels.typography}>{label}:</Text>
              <Value>
                <Text htmlElement="span" {...theme.labels.typography}>
                  ({percentValue})
                </Text>{' '}
                <Text htmlElement="span" {...theme.labels.typography}>
                  {valueFormatter(value, formatValue)}
                </Text>
              </Value>
            </PartialItem>
          ))}
        </PartialsContainer>
      )}
    </BaseTooltip>
  );
};

export default Tooltip;
