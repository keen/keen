/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import styled from 'styled-components';
import { action } from '@storybook/addon-actions';

import { Dropdown } from './dropdown.component';
import DropdownList from '../dropdown-list';
import Button from '../button';

export default {
  title: 'Styleguide | Dropdown',
  parameters: {
    component: Dropdown,
    componentSubtitle: 'Dropdown component with customized motion properties',
  },
};

const Container = styled.div`
  position: relative;
`;

export const withList = () => {
  const [isOpen, setOpen] = React.useState(false);

  const listItems = [
    { label: 'Marketing', value: 0 },
    {
      label: 'IT',
      value: 1,
    },
  ];

  return (
    <>
      <Button onClick={() => setOpen(!isOpen)}>
        {isOpen ? 'Close' : 'Open'}
      </Button>
      <Container>
        <Dropdown isOpen={isOpen} fullWidth={false}>
          <DropdownList
            items={listItems}
            onClick={action('DropdownItemClick')}
          />
        </Dropdown>
      </Container>
    </>
  );
};
