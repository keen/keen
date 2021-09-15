import React, { FC } from 'react';
import { Card } from '@keen.io/ui-core';
import { BodyText } from '@keen.io/typography';
import { colors } from '@keen.io/colors';

import { Container, Header } from './error.widget.styles';
import text from './text.json';

import WidgetHeading from '../widget-heading.component';

import { WidgetSettings } from '../../types';

type Props = {
  /** Error header */
  header?: string;
  /** Error message */
  message: string;
} & WidgetSettings;

const ErrorWidget: FC<Props> = ({
  card,
  title,
  subtitle,
  message,
  header = text.renderError,
}) => (
  <Card {...card}>
    <WidgetHeading title={title} subtitle={subtitle} />
    <Container>
      <Header>{header}</Header>
      <BodyText variant="body1" color={colors.red[500]}>
        {message}
      </BodyText>
    </Container>
  </Card>
);

export default ErrorWidget;
