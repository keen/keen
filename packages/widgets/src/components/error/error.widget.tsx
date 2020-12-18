import React, { FC } from 'react';
import { Card } from '@keen.io/ui-core';

import { Container, Details, Header } from './error.widget.styles';
import text from './text.json';

import WidgetHeading from '../widget-heading.component';

import { WidgetSettings } from '../../types';

type Props = {
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
      <Details>{message}</Details>
    </Container>
  </Card>
);

export default ErrorWidget;
