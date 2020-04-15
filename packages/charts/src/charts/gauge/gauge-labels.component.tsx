import React, { FC, useState, useRef, useEffect } from 'react';
import { Typography } from '@keen.io/ui-core';

type Props = {
  arcPath: string;
  minValue: number;
  maxValue: number;
  typography: Typography;
};

const GaugeLabels: FC<Props> = ({
  arcPath,
  minValue,
  maxValue,
  typography,
}) => {
  const [rect, setRect] = useState<SVGRect>(null);
  const element = useRef(null);

  useEffect(() => {
    const bbox = element.current.getBBox();
    setRect(bbox);
  }, []);

  const { fontColor, ...textProps } = typography;
  const textStyle = {
    transform: `translateY(${textProps.fontSize + 10}px)`,
    fill: fontColor,
    ...textProps,
  };

  return (
    <g>
      <path ref={element} fill="transparent" d={arcPath} />
      {rect && (
        <>
          <text textAnchor="middle" style={textStyle} x={rect.x} y={rect.y}>
            {minValue}
          </text>
          <text
            textAnchor="middle"
            style={textStyle}
            x={rect.x + rect.width}
            y={rect.y}
          >
            {maxValue}
          </text>
        </>
      )}
    </g>
  );
};

export default GaugeLabels;
