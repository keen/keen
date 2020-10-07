/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';

import RadioGroup from './radio-group.component';
import { radioItems } from './radio-group.fixtures';

export default {
  title: 'Components|RadioGroup',
  parameters: {
    component: RadioGroup,
    componentSubtitle: 'Displays animated brand loader',
  },
};

export const withKnobs = () => {
  const [activeItem, setActiveItem] = React.useState(null);
  return (
    <RadioGroup
      items={radioItems}
      activeItem={activeItem}
      onClick={({ id }) => setActiveItem(id)}
    />
  );
};
