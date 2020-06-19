import * as React from 'react';
import { action } from '@storybook/addon-actions';

import Confirmation from './confirmation.component';

export default {
  title: 'Components|Confirmation',
  parameters: {
    component: Confirmation,
    componentSubtitle: 'Confirmation component',
  },
};

const Description = () => <div>Do You confirm this action?</div>;

export const basic = () => (
  <div style={{ width: '400px', height: '400px' }}>
    <Confirmation
      title="Confirmation"
      onConfirm={action('onConfirm')}
      onCancel={action('onCancel')}
    >
      <Description />
    </Confirmation>
  </div>
);
