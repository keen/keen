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
  /** Toast auto dismiss timeout in [ms] */
  autoDismissTimeout?: number;
};

const ToastProvider: FC<Props> = ({
  children,
  placement = 'top-center',
  autoDismissTimeout = 3000,
}) => (
  <ReactNotificationsToastProvider
    components={{ Toast: Toast, ToastContainer: ToastContainer }}
    placement={placement}
    autoDismissTimeout={autoDismissTimeout}
  >
    {children}
  </ReactNotificationsToastProvider>
);

export default ToastProvider;
