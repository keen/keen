/* eslint-disable react-hooks/rules-of-hooks */

import * as React from 'react';
import styled from 'styled-components';
import { boolean } from '@storybook/addon-knobs';

import Toggle from './toggle.component';

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

export const withKnobs = () => {
  const [toggle, setToggle] = React.useState(false);
  return (
    <Wrapper>
      <Toggle
        isOn={toggle}
        onChange={setToggle}
        isDisabled={boolean('Disable toggle', false, 'Toggle')}
      />
    </Wrapper>
  );
};
