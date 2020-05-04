import React from 'react';
import { colors } from '@keen.io/colors';

import { BaseText } from './text.component';
import { textVariants } from '../theme';

import { TextVariant, Typography } from '../types';

type Props = {
  children: string;
  color?: string;
  variant?: TextVariant;
};

const HTML_ELEMENTS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

export const Title = ({
  children,
  variant = 'h1',
  color = colors.black['100'],
}: Props) => {
  const typography = textVariants[variant] as Typography;
  return (
    <BaseText
      as={HTML_ELEMENTS.includes(variant) ? (variant as any) : 'div'}
      fontColor={color}
      {...typography}
    >
      {children}
    </BaseText>
  );
};

export default Title;
