import React, { FC } from 'react';

import {
  StyledBulletList,
  StyledBulletItem,
  BulletPoint,
} from './bullet-list.styles';

import { Text } from '../../typography';

import { Typography } from '../../types';

type Point = {
  color: string;
  value: string;
};

type Props = {
  list: Point[];
  typography?: Typography;
};

const BulletList: FC<Props> = ({ list, typography }) => {
  const listItems = list.map((item, idx: number) => (
    <StyledBulletItem key={`${item.value}.${idx}`}>
      <BulletPoint color={item.color} />
      <Text {...typography}>{item.value}</Text>
    </StyledBulletItem>
  ));

  return <StyledBulletList>{listItems}</StyledBulletList>;
};

export default BulletList;
