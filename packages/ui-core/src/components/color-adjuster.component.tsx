import React, { FC, useMemo } from 'react';
import Color from 'color';

type Props = {
  children: (color: string) => React.ReactNode;
  baseColor: string;
};

export const ColorAdjuster: FC<Props> = ({ children, baseColor }) => {
  const adjustedColor = useMemo(() => {
    const color = Color(baseColor);

    if (color.isLight()) {
      return color.darken(0.5).string();
    } else {
      const [h, s] = color.hsl().array();
      return Color.hsl([h, s, 85]).toString();
    }
  }, [baseColor]);

  return <>{children(adjustedColor)}</>;
};

export default ColorAdjuster;
