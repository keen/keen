/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import { select, boolean } from '@storybook/addon-knobs';

import DropableContainer from './dropable-container.component';

export default {
  title: 'Dropdown / Dropable Container',
  parameters: {
    component: DropableContainer,
    componentSubtitle: 'Dropable container - composed from atomic elements',
  },
};

const options = 'ASC';

export const Basic: React.FC = () => {
  const [editMode, setEditMode] = React.useState<boolean>(false);
  return (
    <DropableContainer
      isActive={editMode}
      variant={select(
        'Variant',
        {
          primary: 'primary',
          secondary: 'secondary',
          transparent: 'transparent',
        },
        'primary',
        'Options'
      )}
      searchable={boolean('Searchable', false, 'Options')}
      dropIndicator={boolean('Drop indicator', false, 'Options')}
      hasError={boolean('Has error', false, 'Options')}
      onClick={() => !editMode && setEditMode(true)}
      onDefocus={() => setEditMode(false)}
      value={options}
    >
      {options}
    </DropableContainer>
  );
};
