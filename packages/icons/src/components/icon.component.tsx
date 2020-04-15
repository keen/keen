import React, { FC } from 'react';
import { colors } from '@keen.io/colors';

import { getIcon } from './utils';

import { IconType } from '../types';

type Props = {
  width?: number;
  height?: number;
  fill?: string;
  type: IconType;
};

export const Icon: FC<Props> = ({
  width = 15,
  height = 15,
  fill = colors.white['500'],
  type,
}: Props) => React.createElement(getIcon(type), { fill, width, height });

export default Icon;
