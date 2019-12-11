import * as React from 'react';

import { storiesOf } from '@storybook/react';

import Chart from './line-chart.component';

storiesOf('Charts / Line Chart', module).add('Basic', () => <Chart />);
