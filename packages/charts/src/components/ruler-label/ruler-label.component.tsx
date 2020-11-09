import React, { FC, useEffect, useRef } from 'react';

import { fitText } from './utils';

import { Orientation } from '../../types';

type Props = {
  dx: number | string;
  dy: number | string;
  children: React.ReactNode;
  orientation: Orientation;
  maxDimension?: number;
};

const RulerLabel: FC<Props> = ({
  dx,
  dy,
  children,
  orientation,
  maxDimension,
}) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (maxDimension && textRef.current) {
      fitText(textRef.current, maxDimension);
    }
  }, [maxDimension, children]);

  return (
    <text
      data-elementid={`${orientation}-ruler-label`}
      ref={textRef}
      dx={dx}
      dy={dy}
    >
      {children}
    </text>
  );
};

export default RulerLabel;
