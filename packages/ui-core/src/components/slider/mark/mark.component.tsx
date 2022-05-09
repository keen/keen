import React, { FC } from 'react';

import { Circle } from './mark.styles';

type Props = {
  size: number;
  backgroundColor: string;
  borderColor: string;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
};

const Mark: FC<Props> = ({
  size,
  borderColor,
  backgroundColor,
  onMouseEnter,
  onMouseLeave,
}) => (
  <Circle
    data-testid="mark-circle"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    borderColor={borderColor}
    backgroundColor={backgroundColor}
    size={size}
  />
);

export default Mark;
