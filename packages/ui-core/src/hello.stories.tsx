import * as React from 'react';

import { storiesOf } from '@storybook/react';

import Hello from './hello.component';

storiesOf('Components / Hello', module).add('Hello', () => <Hello />);
