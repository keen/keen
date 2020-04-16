import React, { FC } from 'react';
import { colors } from '@keen.io/colors';

import { getIcon } from './utils';

import { IconType } from '../types';

type Props = {
  width?: number;
  height?: number;
  fill?: string;
  opacity?: number;
  type: IconType;
};

export const Icon: FC<Props> = ({
  width = 15,
  height = 15,
  opacity = 1,
  fill = colors.white['500'],
  type,
}: Props) =>
  React.createElement(getIcon(type), { fill, opacity, width, height });

export default Icon;
