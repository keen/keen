import React, { FC } from 'react';
import { BulletList } from '@keen.io/ui-core';

import { getFromPath } from '../../utils';

import { DataSelector } from '../../types';

type Props = {
  data: object[];
  selectors: { selector: DataSelector; color: string }[];
};

const Tooltip: FC<Props> = ({ data, selectors }) => (
  <BulletList
    list={selectors.map(({ color, selector }) => ({
      value: getFromPath(data, selector),
      color,
    }))}
  />
);

export default Tooltip;
