/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';

import RadioSelect from './radio-select.component';
import { radioItems } from './radio-select.fixtures';

export default {
  title: 'Components / RadioSelect',
  parameters: {
    component: RadioSelect,
  },
};

export const withKnobs = () => {
  const [activeItem, setActiveItem] = React.useState(null);
  return (
    <div style={{ width: 300, margin: 'auto' }}>
      <RadioSelect
        items={radioItems}
        activeItem={activeItem}
        onClick={({ id }) => setActiveItem(id)}
      />
    </div>
  );
};
