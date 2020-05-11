import * as React from 'react';

import { ContentSeparator } from './content-separator.component';

export default {
  title: 'Components|Content Separator',
  parameters: {
    component: ContentSeparator,
    componentSubtitle: 'Displays content separator with section name',
  },
};

export const basic = () => <ContentSeparator>Section</ContentSeparator>;
