import React, { useRef, useEffect, useState } from 'react';

import { ContainerTooltip } from './slider.styles';
import { Position } from '../../types';

type Props = {
  tooltipPosition: Position;
  size: number;
  children: React.ReactNode;
};

export const ControlTooltip = ({ tooltipPosition, size, children }: Props) => {
  const ref = useRef<HTMLDivElement>();
  const [state, setState] = useState({
    width: 0,
    height: 0,
  });

  const { width, height } = state;

  useEffect(() => {
    setState({
      width: ref.current.clientWidth,
      height: ref.current.clientHeight,
    });
  }, [ref.current]);

  return (
    <ContainerTooltip
      ref={ref}
      type={tooltipPosition}
      width={width}
      height={height}
      size={size}
    >
      {children}
    </ContainerTooltip>
  );
};

export default ControlTooltip;
