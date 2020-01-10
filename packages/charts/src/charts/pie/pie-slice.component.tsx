import React, { FC, useState, useContext } from 'react';

import PieLabel from './pie-label.component';
import { StyledPath } from './pie-slice.styles';

import { ChartContext, ChartContextType } from '../../contexts';

type Props = {
  path: string;
  pathActive: string;
  autocolor: boolean;
  labelPosition: [number, number];
  label: string;
  background: string;
};

const PieSlice: FC<Props> = ({
  path,
  pathActive,
  background,
  autocolor,
  label,
  labelPosition,
}) => {
  const [active, setActive] = useState(false);
  const { theme } = useContext(ChartContext) as ChartContextType;
  const { labels } = theme;

  return (
    <g
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <StyledPath
        fill={background}
        d={active ? pathActive : path}
        dropShadow={active}
      />
      {labels.enabled && (
        <PieLabel
          sliceBackground={background}
          autocolor={autocolor}
          position={labelPosition}
          {...labels.typography}
        >
          {label}
        </PieLabel>
      )}
    </g>
  );
};

export default PieSlice;
