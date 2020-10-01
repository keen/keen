import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { select, text } from '@storybook/addon-knobs';

import { ActionButton } from './action-button.component';

export default {
  title: 'Others/Components/Action-Button',
  parameters: {
    component: ActionButton,
    componentSubtitle: 'Displays customized action-button',
  },
};

export const primary = () => (
  <ActionButton
    onClick={action('click')}
    background={text('Background', '', 'Action-Button')}
    backgroundHover={text('Background on hover', '', 'Action-Button')}
    borderRadius={text('Border Radius', '4px', 'Action-Button')}
    action={select(
      'Action Type',
      { create: 'create', remove: 'remove' },
      'create',
      'Action-Button'
    )}
  />
);
