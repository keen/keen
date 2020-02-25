import React from 'react';

import { Icon, IconType } from '@keen.io/icons';

import { Position } from '../types';

type Props = {
  type: Position;
  fill: string;
};

const directions: Record<Position, Partial<IconType>> = {
  left: 'caret-left',
  right: 'caret-right',
  top: 'caret-up',
  bottom: 'caret-down',
};

const Caret = ({ type, fill }: Props) =>
  React.createElement(Icon, {
    type: directions[type],
    fill,
  });

export default Caret;
