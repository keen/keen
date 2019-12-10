import React from 'react';
import styled from 'styled-components';
import {
  variant,
  typography,
  color,
  ColorProps,
  TypographyProps,
} from 'styled-system';

type LeveLRange = 1 | 2 | 3 | 4 | 5 | 6;

type Props = {
  children: string
  level?: LeveLRange;
};

const BaseTitle = styled.div<ColorProps & TypographyProps>`
  ${color}
  ${typography}
  ${variant({
    prop: 'as',
    variants: {
      h1: {
        lineHeight: 4,
      },
      h2: {
        lineHeight: 3,
      },
      h3: {
        lineHeight: 2,
      },
      h4: {
        lineHeight: 2,
        fontWeight: 'regular',
      },
      h5: {
        lineHeight: 1,
        fontWeight: 'regular',
      },
      h6: {
        lineHeight: 0,
        fontWeight: 'regular',
      },
    },
  })}
`;

const Title = ({ children, level = 1 }: Props) => {
  const component = `h${level}` as any;
  return (
    <BaseTitle as={component} fontWeight="bold" color="black">
      {children}
    </BaseTitle>
  );
};

export default Title;
