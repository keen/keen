/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';

import EmbedWidget from './embed-widget.component';

export default {
  title: 'Components / Embed Widget',
  parameters: {
    component: EmbedWidget,
    componentSubtitle: 'Embed widget component',
  },
};

export const basic = () => {
  return (
    <EmbedWidget>
      {`
function helloWorld() {
  console.log('Hello world!');
}

helloWorld(); /* Hello world! /*
    `}
    </EmbedWidget>
  );
};
