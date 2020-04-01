import React, { useState } from 'react';
import { HeaderCeil, ArrowsType, SortByType } from '@keen.io/ui-core';
import { FormatFuncType } from '../../types';
import { Header } from './table.styles';

type Props = {
  data?: any;
  color: string;
  onClick?: (res: { property: string; sort: ArrowsType }) => void;
  sorting?: SortByType;
  format?: FormatFuncType;
  onResize?: (res: { property: string; width: number }) => void;
};

export const HeaderRow = ({
  data,
  color,
  onClick,
  sorting,
  format,
  onResize,
}: Props) => {
  const [dragged, setDragged] = useState(false);

  return (
    <Header color={color}>
      {Object.keys(data).map(key => (
        <HeaderCeil
          key={`${key}`}
          onClick={onClick}
          sorting={sorting}
          format={typeof format === 'object' ? format[key] : format}
          dragged={dragged}
          setDragged={setDragged}
          onResize={onResize}
        >
          {key}
        </HeaderCeil>
      ))}
    </Header>
  );
};

export default HeaderRow;
