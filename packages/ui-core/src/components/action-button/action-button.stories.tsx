import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs';

import { ActionButton } from './action-button.component';

export default {
  title: 'Components|Action-Button',
  parameters: {
    component: ActionButton,
    componentSubtitle: 'Displays customized action-button',
  },
};

export const primary = () => (
  <ActionButton
    onClick={action('click')}
    isDisabled
    action={select(
      'Action Type',
      { create: 'create', remove: 'remove' },
      'create',
      'Action-Button'
    )}
  />
);
