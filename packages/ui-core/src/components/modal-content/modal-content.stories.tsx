import * as React from 'react';
import { action } from '@storybook/addon-actions';

import ModalContent from './modal-content.component';

export default {
  title: 'Components|Modal Content',
  parameters: {
    component: ModalContent,
    componentSubtitle: 'Modal content component',
  },
};

const Description = () => <div>Do You confirm this action?</div>;

export const basic = () => (
  <div style={{ width: '400px', height: '400px' }}>
    <ModalContent onConfirm={action('onConfirm')} onCancel={action('onCancel')}>
      <Description />
    </ModalContent>
  </div>
);
