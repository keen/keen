import React, { FC } from 'react';

import { StyledAlert } from './alert.styles';

import { Variant } from './types';

type Props = {
  /** Component React.Children nodes */
  children: React.ReactNode;
  /** Type of alert styles */
  type: Variant;
};

export const Alert: FC<Props> = ({ type, children }) => (
  <StyledAlert type={type}>{children}</StyledAlert>
);

export default Alert;
