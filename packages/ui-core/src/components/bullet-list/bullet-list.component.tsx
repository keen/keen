import React from 'react';

import {
  StyledBulletList,
  StyledBulletItem,
  BulletPoint,
} from './bullet-list.styles';

export interface Point {
  color: string;
  data: string | Record<string, any>;
}

type Props<T> = {
  /** Collection of items */
  items: T[];
  /** Item renderer */
  renderItem: (idx: number, item: T) => React.ReactNode;
};

const BulletList = <T extends Point>({ items, renderItem }: Props<T>) => (
  <StyledBulletList>
    {items.map((item, idx: number) => (
      <StyledBulletItem key={`${item.color}.${idx}`}>
        <BulletPoint color={item.color} />
        {renderItem(idx, item)}
      </StyledBulletItem>
    ))}
  </StyledBulletList>
);

export default BulletList;
