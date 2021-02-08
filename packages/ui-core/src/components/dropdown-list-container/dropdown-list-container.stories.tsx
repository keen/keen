/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';

import DropdownListContainer from './dropdown-list-container.component';
import DropdownList from '../dropdown-list';

export default {
  title: 'Dropdown / Dropdown List Container',
  parameters: {
    component: DropdownListContainer,
    componentSubtitle:
      'Dropdown list container - composed from atomic elements',
  },
};

const options = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' },
  { label: 'Option 4', value: 'option-4' },
  { label: 'Option 5', value: 'option-5' },
];

export const Basic: React.FC = () => {
  const [selectionIndex, setIndex] = React.useState<number>(null);
  return (
    <DropdownListContainer scrollToActive maxHeight={100}>
      {(activeItemRef) => (
        <DropdownList
          ref={activeItemRef}
          items={options}
          setActiveItem={(_item, idx) => selectionIndex === idx}
          onClick={(_e, { value }) => setIndex(value)}
        />
      )}
    </DropdownListContainer>
  );
};
