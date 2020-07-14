import React, { FC } from 'react';
import { Card } from '@keen.io/ui-core';

import { Container, Details, Header } from './error.widget.styles';

import WidgetHeading from '../widget-heading.component';

import { WidgetSettings } from '../../types';

type Props = {
  /** Error message */
  message: string;
} & WidgetSettings;

const ErrorWidget: FC<Props> = ({ card, title, subtitle, message }) => (
  <Card {...card}>
    <WidgetHeading title={title} subtitle={subtitle} />
    <Container>
      <Header>Unable to load data</Header>
      <Details>{message}</Details>
    </Container>
  </Card>
);

export default ErrorWidget;
