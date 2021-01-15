import * as React from 'react';
import { select } from '@storybook/addon-knobs';

import Tabs from './tabs.component';

export default {
  title: 'Components / Tabs',
  parameters: {
    component: Tabs,
    componentSubtitle: 'Tabs component',
  },
};

const tabs = [
  { label: 'Tab One', id: 'tab-one' },
  { label: 'Tab Two', id: 'tab-two' },
  { label: 'Tab Three', id: 'tab-three' },
];

export const Basic = () => {
  const [activeTab, setActiveTab] = React.useState(tabs[0].id);

  return (
    <div style={{ width: '400px', height: '300px' }}>
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onClick={(id) => setActiveTab(id)}
        type={select(
          'Type',
          { default: 'default', large: 'large' },
          'default',
          'Tab Type'
        )}
      />
    </div>
  );
};
