import React, { FC, useContext } from 'react';
import { Text, BulletList, Point } from '@keen.io/ui-core';

import TooltipItem from '../tooltip-item';

import {
  Total,
  TextContainer,
  LabelContainer,
  Container,
  BulletListContainer,
} from './tooltip-content.styles';

import { ChartContext, ChartContextType } from '../../contexts';
import { ItemData } from 'charts/src/types';

type Props = {
  /** Items */
  items: Point[];
  /** Label for tooltip */
  label?: string | number;
  /** Total value */
  totalValue?: string | number;
  /** Percent value */
  percentValue?: number;
  /** Max width for tooltip content */
  maxWidth?: number;
};

const TooltipContent: FC<Props> = ({
  items,
  label,
  totalValue,
  percentValue,
  maxWidth = 200,
}: Props) => {
  const {
    theme,
    theme: { tooltip },
  } = useContext(ChartContext) as ChartContextType;

  return (
    <Container maxWidth={maxWidth}>
      {label && (
        <LabelContainer>
          <Text truncate {...tooltip.labels.typography}>
            {label}
          </Text>
        </LabelContainer>
      )}
      <BulletListContainer>
        <BulletList
          items={items}
          renderItem={(_idx, item) => (
            <TooltipItem data={item.data as ItemData} theme={theme} />
          )}
        />
      </BulletListContainer>
      {totalValue !== null && (
        <Total>
          <Text {...tooltip.labels.typography}>Total:</Text>
          {percentValue ? (
            <TextContainer>
              <Text {...tooltip.values.typography}>
                {`${percentValue.toFixed(1)}%`}&nbsp;
              </Text>
              <Text {...tooltip.labels.typography}>{`(${totalValue})`}</Text>
            </TextContainer>
          ) : (
            <Text {...tooltip.values.typography}>{totalValue}</Text>
          )}
        </Total>
      )}
    </Container>
  );
};

export default TooltipContent;
