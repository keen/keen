import * as React from 'react';
import { action } from '@storybook/addon-actions';

import { MoreButton } from './more-button.component';

export default {
  title: 'Components|More-Button',
  parameters: {
    component: MoreButton,
    componentSubtitle: 'Displays customized more-button',
  },
};

export const primary = () => <MoreButton onClick={action('click')} />;
