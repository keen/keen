import React, { FC } from 'react';
import {
  ToastProvider as ReactNotificationsToastProvider,
  Placement,
} from 'react-toast-notifications';

import Toast from '../toast';
import ToastContainer from '../toast-container';

type Props = {
  /** Children nodes */
  children: React.ReactNode;
  /** Toast placements */
  placement?: Placement;
};

const ToastProvider: FC<Props> = ({ children, placement = 'top-center' }) => (
  <ReactNotificationsToastProvider
    components={{ Toast: Toast, ToastContainer: ToastContainer }}
    placement={placement}
  >
    {children}
  </ReactNotificationsToastProvider>
);

export default ToastProvider;
