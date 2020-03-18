import React from 'react';
import { Frame } from 'framer';

type Props = {
  left: number;
  width: number;
  background?: string;
};

const OffRange = (props: Props) => {
  const { left, width, background } = props;
  return (
    <Frame
      name={'OffRange'}
      left={left}
      width={width}
      height={4}
      radius={3}
      background={background}
    />
  );
};

export default OffRange;
