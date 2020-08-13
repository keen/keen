import * as React from 'react';
import { useToasts } from 'react-toast-notifications';

import { ToastProvider } from './components';

export default {
  title: 'Components|Toast Notifications',
  parameters: {
    component: ToastProvider,
    componentSubtitle: 'Alert component for displaying message.',
  },
};

const Notifications = () => {
  const { addToast } = useToasts();

  return (
    <button
      onClick={() => {
        addToast('error message', {
          appearance: 'error',
          showDismissButton: true,
          onDismiss: () => {
            alert(1);
          },
        });
      }}
    >
      Error
    </button>
  );
};

export const notifications = () => (
  <ToastProvider>
    <Notifications />
  </ToastProvider>
);
