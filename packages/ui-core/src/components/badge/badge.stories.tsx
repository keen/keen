import * as React from 'react';

import { Badge } from './badge.component';

export default {
  title: 'Components / Badge',
  parameters: {
    component: Badge,
    componentSubtitle: 'Displays simple badge with multiple variants support',
  },
};

export const variants = () => (
  <div>
    <Badge type="dark">dark</Badge>
    <Badge type="light">light</Badge>
    <Badge type="success">success</Badge>
    <Badge type="danger">danger</Badge>
  </div>
);
