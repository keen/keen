import * as React from 'react';

import SuccessNotification from './success-notification.component';

export default {
  title: 'Others/Components/Success Notification',
  parameters: {
    component: SuccessNotification,
    componentSubtitle: 'Success notification component',
  },
};

export const basic = () => (
  <div style={{ width: '400px', height: '300px' }}>
    <SuccessNotification>Success!</SuccessNotification>
  </div>
);
