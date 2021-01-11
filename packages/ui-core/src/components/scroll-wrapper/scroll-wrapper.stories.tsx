/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import styled from 'styled-components';
import { action } from '@storybook/addon-actions';

import ScrollWrapper from './scroll-wrapper.component';
import Dropdown from '../dropdown';
import DropdownList from '../dropdown-list';
import Button from '../button';

export default {
  title: 'Styleguide / ScrollWrapper',
  parameters: {
    component: ScrollWrapper,
    componentSubtitle: 'Scroll wrapper',
  },
};

const Container = styled.div`
  position: relative;
`;

export const withList = () => {
  const [isOpen, setOpen] = React.useState(false);

  const listItems = [
    { label: 'Milk', value: 0 },
    {
      label: 'Butter',
      value: 1,
    },
    {
      label: 'Eggs',
      value: 2,
    },
    {
      label: 'Bread',
      value: 3,
    },
    {
      label: 'Oranges',
      value: 4,
    },
  ];

  return (
    <>
      <Button onClick={() => setOpen(!isOpen)}>
        {isOpen ? 'Close' : 'Open'}
      </Button>
      <Container>
        <Dropdown isOpen={isOpen} fullWidth={false}>
          <ScrollWrapper>
            <DropdownList
              items={listItems}
              onClick={action('DropdownItemClick')}
            />
          </ScrollWrapper>
        </Dropdown>
      </Container>
    </>
  );
};
