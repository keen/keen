import React, { FC } from 'react';

import {
  StyledBulletList,
  StyledBulletItem,
  BulletPoint,
  TextWrapper,
} from './bullet-list.styles';

import { Text } from '../../typography';

import { Typography } from '../../types';

type Point = {
  color: string;
  value?: string;
  label?: string;
  change?: string;
};

type Props = {
  list: Point[];
  typography?: Typography;
  valuesTypography?: Typography;
};

const BulletList: FC<Props> = ({ list, typography, valuesTypography }) => {
  const listItems = list.map((item, idx: number) => (
    <StyledBulletItem key={`${item.value}.${idx}`}>
      <BulletPoint color={item.color} />
      {item.label && (
        <TextWrapper>
          <Text {...typography}>{item.label}</Text>
        </TextWrapper>
      )}
      {item.value && (
        <TextWrapper>
          <Text {...valuesTypography}>{item.value}</Text>
        </TextWrapper>
      )}
      {item.change && (
        <TextWrapper>
          <Text {...typography}>{item.change}</Text>
        </TextWrapper>
      )}
    </StyledBulletItem>
  ));

  return <StyledBulletList>{listItems}</StyledBulletList>;
};

export default BulletList;
