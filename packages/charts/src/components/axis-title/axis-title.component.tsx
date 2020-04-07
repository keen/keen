import React from 'react';
import { Typography } from '@keen.io/ui-core';

import { AxisTitle, Orientation } from '../../types';

import Title from './title.component';

type Props = {
  x?: AxisTitle;
  y?: AxisTitle;
} & Typography;

const AxisTitle = ({ x, y, ...typography }: Props) => (
  <>
    {x && (
      <Title
        axisTitle={x}
        orientation={Orientation.HORIZONTAL}
        {...typography}
      />
    )}
    {y && (
      <Title axisTitle={y} orientation={Orientation.VERTICAL} {...typography} />
    )}
  </>
);

export default AxisTitle;
