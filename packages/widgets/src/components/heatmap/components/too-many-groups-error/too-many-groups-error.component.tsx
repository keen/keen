import React from 'react';
import { BodyText, Headline } from '@keen.io/typography';
import { colors } from '@keen.io/colors';

import { Container } from './too-many-groups-error.styles';
import text from './text.json';

const TooManyGroupsError = () => (
  <Container>
    <Headline
      variant="h3"
      color={colors.blue[500]}
      fontWeight={400}
      lineHeight={2}
    >
      {text.title}
    </Headline>
    <BodyText
      variant="body1"
      color={colors.black[100]}
      dangerouslySetInnerHTML={{ __html: text.message }}
      lineHeight={1.5}
    />
  </Container>
);

export default TooManyGroupsError;
