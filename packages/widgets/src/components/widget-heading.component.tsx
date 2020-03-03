import React, { FC } from 'react';
import { Text, Typography } from '@keen.io/ui-core';

import { Container } from './widget-heading.styles';

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
}) => <Text {...typography}>{content}</Text>;

export const WidgetHeading: FC<Props> = ({ title, subtitle }) => (
  <Container>
    {title.content && <Title {...title} />}
    {subtitle.content && <Title {...subtitle} />}
  </Container>
);

export default WidgetHeading;
