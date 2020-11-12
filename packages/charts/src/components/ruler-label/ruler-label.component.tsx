import React, { FC, useLayoutEffect, useState, useRef } from 'react';

import { fitText } from './utils';

import { Orientation } from '../../types';

type Props = {
  /** X position */
  dx: number | string;
  /** Y position */
  dy: number | string;
  /** Children nodes */
  children: React.ReactNode;
  /** Orientation */
  orientation: Orientation;
  /** Maximum dimension for label */
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
  const [isTruncated, setTextTruncate] = useState(false);

  useLayoutEffect(() => {
    if (maxDimension && textRef.current) {
      const text = children ? children.toString() : '';
      if (text) {
        const { isTruncated } = fitText(textRef.current, text, maxDimension);
        setTextTruncate(isTruncated);
      }
    }
  }, [maxDimension, children]);

  return (
    <g>
      <text
        data-elementid={`${orientation}-ruler-label`}
        ref={textRef}
        dx={dx}
        dy={dy}
      >
        {children}
      </text>
      {isTruncated && <title data-testid="ruler-label-title">{children}</title>}
    </g>
  );
};

export default RulerLabel;
