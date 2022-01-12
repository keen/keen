import React from 'react';

import { Container, Message, Title } from './too-many-groups-error.styles';
import text from './text.json';

const TooManyGroupsError = () => (
  <Container>
    <Title>{text.title}</Title>
    <Message dangerouslySetInnerHTML={{ __html: text.message }} />
  </Container>
);

export default TooManyGroupsError;
