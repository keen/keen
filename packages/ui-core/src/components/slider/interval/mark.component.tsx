import React, { FC } from 'react';

import { Circle } from './mark.styles';

type Props = {
  size: number;
  backgroundColor: string;
  borderColor: string;
};

const Mark: FC<Props> = ({ size, borderColor, backgroundColor }) => (
  <Circle
    borderColor={borderColor}
    backgroundColor={backgroundColor}
    size={size}
  />
);

export default Mark;
