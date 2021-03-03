import React, { FC } from 'react';

import { Title, Message, Container } from './geo-match-error.styles';

import { MAP_NAME } from './constants';
import text from './text.json';

type Props = {
  /* Geographic area map */
  geographicArea: 'us' | 'world';
};

const GeoMatchError: FC<Props> = ({ geographicArea }) => (
  <Container>
    <Title>
      {text.title} {MAP_NAME[geographicArea]} {text.map}
    </Title>
    <Message>{text.message}</Message>
  </Container>
);

export default GeoMatchError;
