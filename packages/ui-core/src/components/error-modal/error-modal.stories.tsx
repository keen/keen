import * as React from 'react';
import { action } from '@storybook/addon-actions';

import ErrorModal from './error-modal.component';

export default {
  title: 'Components|Error Modal',
  parameters: {
    component: ErrorModal,
    componentSubtitle: 'Error modal component',
  },
};

const Description = () => <div>Error description</div>;

export const basic = () => (
  <div style={{ width: '400px', height: '400px' }}>
    <ErrorModal title="Error" onCancel={action('onCancel')}>
      <Description />
    </ErrorModal>
  </div>
);
