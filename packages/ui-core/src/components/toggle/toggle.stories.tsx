import * as React from 'react';
import styled from 'styled-components';
import { boolean, number, text } from '@storybook/addon-knobs';
import { loremIpsum } from 'lorem-ipsum';

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

const textKnob = (title: string, defaultValue: string, namespace: string) =>
  text(title, defaultValue, namespace);

export const withKnobs = () => (
  <Wrapper>
    <Toggle
      isDisabled={boolean('Disable toggle', true, 'Toggle')}
      width={number('Toggle width', 60, { min: 60 }, 'Toggle')}
      text={[
        textKnob('Toggle text for active state', 'on', 'Toggle'),
        textKnob('Toggle text for inactive state', 'off', 'Toggle'),
      ]}
    >
      {loremIpsum({ count: 5, units: 'word' })}
    </Toggle>
  </Wrapper>
);
