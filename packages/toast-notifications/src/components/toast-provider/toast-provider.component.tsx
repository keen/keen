import React, { FC } from 'react';
import { ToastProvider as ReactNotificationsToastProvider } from 'react-toast-notifications';

import Toast from '../toast';

type Props = {
  /** Children nodes */
  children: React.ReactNode;
};

const ToastProvider: FC<Props> = ({ children }) => (
  <ReactNotificationsToastProvider components={{ Toast: Toast }}>
    {children}
  </ReactNotificationsToastProvider>
);

export default ToastProvider;
