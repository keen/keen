import * as React from 'react';
import { boolean } from '@storybook/addon-knobs';

import Title from './title.component';

export default {
  title: 'Components / Title',
  parameters: {
    component: Title,
    componentSubtitle: 'Title component',
  },
};

export const basic = () => {
  return (
    <Title
      isDisabled={boolean('Is disabled', false, 'Options')}
      hasError={boolean('Has error', false, 'Options')}
    >
      Title
    </Title>
  );
};
