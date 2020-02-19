import React, { FC } from 'react';
import { BulletList } from '@keen.io/ui-core';

import { getFromPath } from '../../utils';

import { DataSelector } from '../../types';

type Props = {
  data: object[];
  selectors: { selector: DataSelector; color: string }[];
  isList: boolean;
};

const BarTooltip: FC<Props> = ({ data, isList, selectors }) => {
  return (
    <>
      {isList ? (
        <BulletList
          list={selectors.map(({ color, selector }) => ({
            value: getFromPath(data, selector),
            color,
          }))}
        />
      ) : (
        <>
          {selectors.map(({ selector, color }) => (
            <div key={color}>{getFromPath(data, selector)}</div>
          ))}
        </>
      )}
    </>
  );
};

export default BarTooltip;
