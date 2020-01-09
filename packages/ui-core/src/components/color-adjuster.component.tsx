import React, { FC, useMemo } from 'react';
import Color from 'color';

type Props = {
  children: (color: string) => React.ReactNode;
  baseColor: string;
};

export const ColorAdjuster: FC<Props> = ({ children, baseColor }) => {
  const adjustedColor = useMemo(() => {
    const color = Color(baseColor);
    const [hue, saturation, lightness] = color.hsl().array();
    let lightnessModifier = 0;

    if (color.isLight()) {
      lightnessModifier = lightness > 75 ? 20 : 15;
    } else {
      lightnessModifier = lightness > 25 ? 85 : 80;
    }

    return Color.hsl([hue, saturation, lightnessModifier]).toString();
  }, [baseColor]);

  return <>{children(adjustedColor)}</>;
};

export default ColorAdjuster;
