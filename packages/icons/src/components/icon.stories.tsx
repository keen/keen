import * as React from 'react';
import styled from 'styled-components';
import { colors } from '@keen.io/colors';

import { Icon } from './icon.component';

import { IconType } from '../types';

export default {
  title: 'Components|Icons',
  parameters: {
    component: Icon,
    componentSubtitle: 'Displays icon based on provided type',
  },
};

const commonProps = {
  height: 30,
  width: 30,
  fill: colors.blue['500'],
};

const Variant = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
`;

const Title = styled.div`
  margin-top: 8px;
  color: ${colors.orange['500']}
  font-family: 'Gangster Grotesk Regular', sans-serif;
  font-size: 11px;
`;

const icons = [
  'arrow-down',
  'arrow-up',
  'caret-down',
  'caret-up',
  'caret-left',
  'caret-right',
  'brand',
];

export const variants = () => (
  <Container>
    {icons.map((name: IconType, idx) => (
      <Variant key={idx}>
        <Icon {...commonProps} type={name} />
        <Title>{name}</Title>
      </Variant>
    ))}
  </Container>
);
