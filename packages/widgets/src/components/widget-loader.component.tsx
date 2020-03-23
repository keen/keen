import React from 'react';
import { Loader } from '@keen.io/ui-core';

import { Container } from './widget-loader.styles';

const WidgetLoader = () => (
  <Container>
    <Loader height={40} width={40} />
  </Container>
);

export default WidgetLoader;
