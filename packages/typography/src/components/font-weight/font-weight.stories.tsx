import * as React from 'react';
import styled from 'styled-components';
import { select } from '@storybook/addon-knobs';

import FontWeight from './font-weight.component';
import { FontWeight as FontWeightType } from '../../types';

export default {
  title: 'Typography / FontWeight',
  parameters: {
    component: FontWeight,
    componentSubtitle: 'Displays text with font weight',
  },
};

const fontWeightOptions: FontWeightType[] = [
  100,
  200,
  300,
  400,
  500,
  600,
  700,
  800,
  900,
  'normal',
  'lighter',
  'bold',
  'bolder',
];

const Container = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  padding: 6px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const LatoFont = styled.div`
  font-family: 'Lato', sans-serif;
`;

const GangsterGroteskFont = styled.div`
  font-family: 'Gangster Grotesk', sans-serif;
`;

export const basic = () => (
  <Container>
    <Wrapper>
      <LatoFont>
        <div>Lato:</div>
        <FontWeight fontWeight={select('Font weight', fontWeightOptions, 400)}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </FontWeight>
      </LatoFont>
      <GangsterGroteskFont>
        <div>Gangster Grotesk:</div>
        <FontWeight fontWeight={select('Font weight', fontWeightOptions, 400)}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </FontWeight>
      </GangsterGroteskFont>
    </Wrapper>
  </Container>
);

basic.story = {
  parameters: {
    docs: {
      description: {
        story: 'FontWeight',
      },
    },
  },
};
