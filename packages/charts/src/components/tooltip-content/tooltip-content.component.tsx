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
    <Container>
      {scaleLabel && (
        <LabelContainer>
          <Text {...tooltip.labels.typography}>{scaleLabel}</Text>
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
      {totalValue && (
        <Total>
          <Text {...tooltip.labels.typography}>Total:</Text>
          {percentValue ? (
            <TextContainer>
              <Text {...tooltip.values.typography}>
                {`${percentValue.toFixed(2)}%`}&nbsp;
              </Text>
              <Text {...tooltip.labels.typography}>{`(${totalValue})`}</Text>
            </TextContainer>
          ) : (
            <Text {...tooltip.values.typography}>{totalValue}</Text>
          )}
        </Total>
      )}
    </Container>
  ) : (
    <Container>
      {scaleLabel && (
        <LabelContainer>
          <Text {...tooltip.labels.typography}>{scaleLabel}</Text>
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
    </Container>
  );
};

export default TooltipContent;
