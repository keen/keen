import * as React from 'react';
import { select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Icon, IconType } from '@keen.io/icons';

import CircleButton from './circle-button.component';

export default {
  title: 'Styleguide | Circle Button',
  parameters: {
    component: CircleButton,
    componentSubtitle: 'Displays customized CircleButton',
  },
};

const options = [
  'arrow-down',
  'arrow-up',
  'caret-down',
  'caret-up',
  'caret-left',
  'caret-right',
  'check',
  'close',
  'line',
  'brand',
  'info',
  'question-mark',
  'eye-solid',
  'eye-slash-solid',
  'cursor-solid',
  'click-solid',
  'user-solid',
  'users-solid',
  'churn-money-solid',
  'churn-solid',
  'money-solid',
  'lock-open',
  'lock-closed',
  'temperature',
  'search',
];

export const button = () => (
  <CircleButton
    icon={
      <Icon
        type={select('Icon', options, options[0], 'Circle-Button') as IconType}
        width={15}
        height={15}
      />
    }
    onClick={action('click')}
  />
);

button.story = {
  parameters: {
    docs: {
      storyDescription: 'CircleButton with custom icon',
    },
  },
};
