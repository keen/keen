import * as React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, color, boolean } from '@storybook/addon-knobs';
import { loremIpsum } from 'lorem-ipsum';

import Card from './card.component';

const Wrapper = styled.div`
  width: 400px;
`;

storiesOf('Charts / Components', module)
  .addDecorator(withKnobs)
  .add('Card', () => (
    <Wrapper>
      <Card
        hasShadow={boolean('hasShadow', true)}
        border={text('border', 'none')}
        backgroundColor={color('backgroundColor', 'white')}
      >
        {loremIpsum()}
      </Card>
    </Wrapper>
  ));
