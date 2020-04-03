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

export const withKnobs = () => (
  <Wrapper>
    <Toggle isDisabled={boolean('Disable toggle', false, 'Toggle')} />
  </Wrapper>
);
