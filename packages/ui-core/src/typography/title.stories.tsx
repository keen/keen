import * as React from 'react';
import { loremIpsum } from 'lorem-ipsum';

import { Title } from './title.component';

export default {
  title: 'Components / Typography',
  parameters: {
    component: Title,
    componentSubtitle: 'Title component',
  },
};

export const H1 = () => <Title variant="h1">{loremIpsum()}</Title>;

H1.story = {
  parameters: {
    docs: {
      storyDescription: 'Predefined styles for `H1` text',
    },
  },
};

export const H2 = () => <Title variant="h2">{loremIpsum()}</Title>;

H2.story = {
  parameters: {
    docs: {
      storyDescription: 'Predefined styles for `H2` text',
    },
  },
};

export const H3 = () => <Title variant="h3">{loremIpsum()}</Title>;

H3.story = {
  parameters: {
    docs: {
      storyDescription: 'Predefined styles for `H3` text',
    },
  },
};

export const H4 = () => <Title variant="h4">{loremIpsum()}</Title>;

H4.story = {
  parameters: {
    docs: {
      storyDescription: 'Predefined styles for `H4` text',
    },
  },
};

export const H5 = () => <Title variant="h5">{loremIpsum()}</Title>;

H5.story = {
  parameters: {
    docs: {
      storyDescription: 'Predefined styles for `H5` text',
    },
  },
};

export const H6 = () => <Title variant="h6">{loremIpsum()}</Title>;

H6.story = {
  parameters: {
    docs: {
      storyDescription: 'Predefined styles for `H6` text',
    },
  },
};

export const BodyBold = () => <Title variant="body-bold">{loremIpsum()}</Title>;

BodyBold.story = {
  parameters: {
    docs: {
      storyDescription: 'Predefined styles for `Body-Bold` text',
    },
  },
};

export const BodyNormal = () => (
  <Title variant="body-normal">{loremIpsum()}</Title>
);

BodyNormal.story = {
  parameters: {
    docs: {
      storyDescription: 'Predefined styles for `Body-Normal` text',
    },
  },
};

export const NumberXL = () => <Title variant="number-xl">{loremIpsum()}</Title>;

NumberXL.story = {
  parameters: {
    docs: {
      storyDescription: 'Predefined styles for `Number-XL` text',
    },
  },
};

export const NumberL = () => <Title variant="number-l">{loremIpsum()}</Title>;

NumberL.story = {
  parameters: {
    docs: {
      storyDescription: 'Predefined styles for `Number-L` text',
    },
  },
};

export const NumberM = () => <Title variant="number-m">{loremIpsum()}</Title>;

NumberM.story = {
  parameters: {
    docs: {
      storyDescription: 'Predefined styles for `Number-M` text',
    },
  },
};

export const NumberS = () => <Title variant="number-s">{loremIpsum()}</Title>;

NumberS.story = {
  parameters: {
    docs: {
      storyDescription: 'Predefined styles for `Number-S` text',
    },
  },
};
