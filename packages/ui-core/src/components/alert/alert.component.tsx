import React, { FC } from 'react';

import { StyledAlert } from './alert.styles';

import { Variant } from './types';

type Props = {
  /** Component React.Children nodes */
  children: React.ReactNode;
  /** Type of alert styles */
  type: Variant;
  /** Enable content width */
  contentWidth?: boolean;
};

export const Alert: FC<Props> = ({ type, contentWidth = false, children }) => (
  <StyledAlert role="alert" type={type} contentWidth={contentWidth}>
    {children}
  </StyledAlert>
);

export default Alert;
