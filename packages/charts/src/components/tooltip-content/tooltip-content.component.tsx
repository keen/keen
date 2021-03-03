import React, { FC, useContext } from 'react';
import { Text, BulletList, Point } from '@keen.io/ui-core';

import TooltipItem from '../tooltip-item';

import { Total } from './tooltip-content.styles';

import { ChartContext, ChartContextType } from '../../contexts';
import { ItemData } from 'charts/src/types';

type Props = {
  /** List indicator */
  isList: boolean;
  /** Items */
  items: Point[];
  /** Label for scale */
  scaleLabel?: string | number;
  /** Total value */
  totalValue?: string;
  /** Percent value */
  percentValue?: number;
};

const TooltipContent: FC<Props> = ({
  isList,
  items,
  scaleLabel,
  totalValue,
  percentValue,
}: Props) => {
  const {
    theme,
    theme: { tooltip },
  } = useContext(ChartContext) as ChartContextType;

  return isList ? (
    <>
      {scaleLabel && <Text {...tooltip.labels.typography}>{scaleLabel}</Text>}
      <BulletList
        items={items}
        renderItem={(_idx, item) => (
          <TooltipItem data={item.data as ItemData} theme={theme} />
        )}
      />
      <Total>
        <Text {...tooltip.labels.typography}>Total:</Text>
        {percentValue ? (
          <div>
            <Text {...tooltip.values.typography}>{`(${percentValue.toFixed(
              2
            )}%)`}</Text>{' '}
            <Text {...tooltip.labels.typography}>{totalValue}</Text>
          </div>
        ) : (
          <Text {...tooltip.values.typography}>{totalValue}</Text>
        )}
      </Total>
    </>
  ) : (
    <>
      <BulletList
        items={items}
        renderItem={(_idx, item) => (
          <TooltipItem data={item.data as ItemData} theme={theme} />
        )}
      />
    </>
  );
};

export default TooltipContent;
