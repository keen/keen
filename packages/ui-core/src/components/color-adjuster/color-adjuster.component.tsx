import React, { FC, useMemo } from 'react';
import Color from 'color';

type Props = {
  children: (color: string) => React.ReactNode;
  baseColor: string;
};

const THRESHOLD = {
  LIGHT: 75,
  DARK: 25,
};

export const ColorAdjuster: FC<Props> = ({ children, baseColor }) => {
  const adjustedColor = useMemo(() => {
    const color = Color(baseColor);
    const [hue, saturation, lightness] = color.hsl().array();
    let lightnessModifier = 0;

    if (color.isLight()) {
      lightnessModifier = lightness > THRESHOLD.LIGHT ? 20 : 15;
    } else {
      lightnessModifier = lightness > THRESHOLD.DARK ? 85 : 80;
    }

    return Color.hsl([hue, saturation, lightnessModifier]).toString();
  }, [baseColor]);

  return <>{children(adjustedColor)}</>;
};

export default ColorAdjuster;
