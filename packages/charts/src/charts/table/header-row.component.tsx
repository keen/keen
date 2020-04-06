import React, { useState } from 'react';
import { HeaderCeil, SortMode, SortByType, Typography } from '@keen.io/ui-core';
import { Header } from './table.styles';

type Props = {
  data: string[];
  color: string;
  onClick?: (res: { property: string; sort: SortMode }) => void;
  sorting?: SortByType;
  onResize?: (res: { property: string; width: number }) => void;
  typography: Typography;
};

export const HeaderRow = ({
  data,
  color,
  onClick,
  sorting,
  onResize,
  typography,
}: Props) => {
  const [dragged, setDragged] = useState(false);

  return (
    <Header color={color} typography={typography}>
      {data.map((item: any) => (
        <HeaderCeil
          key={`${item.key}`}
          onClick={onClick}
          sorting={sorting}
          dragged={dragged}
          setDragged={setDragged}
          onResize={onResize}
          value={item.value}
          property={item.key}
        />
      ))}
    </Header>
  );
};

export default HeaderRow;
