import React from 'react';
import { action } from '@storybook/addon-actions';

import { TagManager } from './tag-manager.component';

export default {
  title: 'Others/Components/Tag Manager',
  parameters: {
    component: TagManager,
    componentSubtitle: 'Displays tag manager wizard',
  },
};

export const basic = () => {
  return (
    <TagManager
      tags={['tag1', 'tag2']}
      hasError={false}
      validator={() => true}
      placeholder="Comma separated values"
      onError={action('onError')}
      onRemove={action('onRemove')}
      onCreate={action('onCreate')}
    />
  );
};
