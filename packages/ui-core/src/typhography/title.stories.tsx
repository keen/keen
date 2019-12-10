import * as React from 'react';
import { ThemeProvider } from 'styled-components';

import { storiesOf } from '@storybook/react';

import { theme } from '../theme';

import Title from './title.component';

storiesOf('Components / Typhography', module).add('Title', () => (
  <ThemeProvider theme={theme}>
    <Title>Title Level 1</Title>
    <Title level={2}>Title Level 2</Title>
    <Title level={3}>Title Level 3</Title>
    <Title level={4}>Title Level 4</Title>
    <Title level={5}>Title Level 5</Title>
    <Title level={6}>Title Level 6</Title>
  </ThemeProvider>
));
