import React from 'react';

import { ArrowUp, ArrowDown, ArrowRight, ArrowLeft } from '@keen.io/icons';

import { Position } from '../types';

type Props = {
  type: Position;
};

const directions: Record<Position, React.SFC> = {
  left: ArrowLeft,
  right: ArrowRight,
  top: ArrowUp,
  bottom: ArrowDown,
};

const Arrow = ({ type }: Props) => React.createElement(directions[type]);

export default Arrow;
