import * as React from 'react';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import { Input } from './input.component';

export default {
  title: 'Components| Forms / Input',
  parameters: {
    component: Input,
    componentSubtitle: 'Simple input component',
  },
};

export const basic = () => (
  <div style={{ width: '250px' }}>
    <Input type="text" defaultValue="keen.io" />
  </div>
);

export const error = () => (
  <div style={{ width: '250px' }}>
    <Input hasError type="text" defaultValue="keen.io" />
  </div>
);

export const withIcon = () => (
  <div style={{ width: '250px' }}>
    <Input
      type="text"
      defaultValue="keen.io"
      renderIcon={() => (
        <Icon
          type="eye-solid"
          width={16}
          height={16}
          fill={colors.blue['400']}
        />
      )}
    />
  </div>
);

error.story = {
  parameters: {
    docs: {
      storyDescription: 'Input with error state.',
    },
  },
};
