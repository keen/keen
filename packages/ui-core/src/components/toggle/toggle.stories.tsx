/* eslint-disable react-hooks/rules-of-hooks */

import * as React from 'react';
import styled from 'styled-components';
import { boolean, select } from '@storybook/addon-knobs';

import Toggle, { ToggleVariant } from './toggle.component';

const Wrapper = styled.div`
  width: 600px;
  padding: 20px;
  box-sizing: border-box;
`;

export default {
  title: 'Components|Toggle',
  parameters: {
    component: Toggle,
    componentSubtitle: 'Displays customized toggle',
  },
};

const toggleVariants = ['primary', 'secondary'];

export const withKnobs = () => {
  const [toggle, setToggle] = React.useState(false);
  return (
    <Wrapper>
      <Toggle
        isOn={toggle}
        onChange={setToggle}
        isDisabled={boolean('Disable toggle', false, 'Toggle')}
        variant={
          select(
            'Variant',
            toggleVariants,
            toggleVariants[0],
            'Toggle'
          ) as ToggleVariant
        }
      />
    </Wrapper>
  );
};
