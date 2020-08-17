import React, { FC } from 'react';
import { Placement } from 'react-toast-notifications';

import { Container } from './toast-container.styles';

type Props = {
  /** Has active toast notifications indicator */
  hasToasts: boolean;
  /** Container placement in DOM */
  placement: Placement;
  /** Children nodes */
  children: React.ReactNode;
};

const ToastContainer: FC<Props> = ({ children, placement }) => (
  <Container placement={placement}>{children}</Container>
);

export default ToastContainer;
