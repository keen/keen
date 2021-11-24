import React, { FC, useState, useRef, useEffect } from 'react';
import { Typography } from '@keen.io/ui-core';
import {
  Formatter,
  formatValue as valueFormatter,
} from '@keen.io/charts-utils';

import { MAX_VALUE_PLACEHOLDER } from './constants';

type Props = {
  arcPath: string;
  minValue: number;
  maxValue: number;
  typography: Typography;
  formatValue?: Formatter;
};

const GaugeLabels: FC<Props> = ({
  arcPath,
  minValue,
  maxValue,
  typography,
  formatValue,
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

  const minLabel = formatValue
    ? valueFormatter(minValue, formatValue)
    : minValue;
  const maxLabel =
    typeof maxValue !== 'number'
      ? MAX_VALUE_PLACEHOLDER
      : formatValue
      ? valueFormatter(maxValue, formatValue)
      : maxValue;

  return (
    <g>
      <path ref={element} fill="transparent" d={arcPath} />
      {rect && (
        <>
          <text textAnchor="middle" style={textStyle} x={rect.x} y={rect.y}>
            {minLabel}
          </text>
          <text
            textAnchor="middle"
            style={textStyle}
            x={rect.x + rect.width}
            y={rect.y}
          >
            {maxLabel}
          </text>
        </>
      )}
    </g>
  );
};

export default GaugeLabels;
