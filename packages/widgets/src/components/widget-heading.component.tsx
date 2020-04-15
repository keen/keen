import React, { FC } from 'react';
import { Text, Typography } from '@keen.io/ui-core';

import { Container, Heading } from './widget-heading.styles';

import { TextSettings } from '../types';

type Props = {
  title: TextSettings;
  subtitle: TextSettings;
};

const Title = ({
  content,
  typography,
}: {
  content: string;
  typography: Typography;
}) => (
  <Heading>
    <Text {...typography}>{content}</Text>
  </Heading>
);

export const WidgetHeading: FC<Props> = ({ title, subtitle }) => (
  <Container>
    {title.content && <Title {...title} />}
    {subtitle.content && <Title {...subtitle} />}
  </Container>
);

export default WidgetHeading;
