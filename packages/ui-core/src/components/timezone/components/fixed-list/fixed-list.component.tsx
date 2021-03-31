import React, { forwardRef } from 'react';
import { FixedSizeList as ReactWindowList } from 'react-window';

import ListRow from '../list-row';

import { Options } from '../../types';

type Props = {
  itemData: Options;
  itemCount: number;
  height?: number;
};

const FixedList = forwardRef<any, Props>(
  ({ itemData, itemCount, height = 150 }, ref) => (
    <ReactWindowList
      ref={ref}
      height={height}
      data-testid="fixed-list"
      itemData={itemData}
      itemCount={itemCount}
      itemSize={28}
      width="100%"
    >
      {ListRow}
    </ReactWindowList>
  )
);

FixedList.displayName = 'FixedList';

export default FixedList;
