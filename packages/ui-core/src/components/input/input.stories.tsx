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

export const outline = () => (
  <div style={{ width: '250px' }}>
    <Input type="text" defaultValue="keen.io" />
  </div>
);

export const solid = () => (
  <div style={{ width: '250px' }}>
    <Input type="text" variant="solid" defaultValue="keen.io" />
  </div>
);

export const errorSolid = () => (
  <div style={{ width: '250px' }}>
    <Input hasError type="text" variant="solid" defaultValue="keen.io" />
  </div>
);

export const errorOutline = () => (
  <div style={{ width: '250px' }}>
    <Input hasError type="text" defaultValue="keen.io" />
  </div>
);

export const outlineWithIcon = () => (
  <div style={{ width: '250px' }}>
    <Input
      type="text"
      defaultValue="keen.io"
      renderSuffix={() => (
        <Icon
          type="eye-solid"
          width={16}
          height={16}
          fill={colors.blue['400']}
        />
      )}
      renderPrefix={() => (
        <Icon type="search" width={16} height={16} fill={colors.blue['400']} />
      )}
    />
  </div>
);

errorSolid.story = {
  parameters: {
    docs: {
      storyDescription: 'Input with error state.',
    },
  },
};
