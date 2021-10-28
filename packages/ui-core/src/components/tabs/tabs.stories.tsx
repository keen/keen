import * as React from 'react';

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
  { label: 'Tab Four', id: 'tab-four' },
  { label: 'Tab Five', id: 'tab-five' },
];

export const Basic = () => {
  const [activeTab, setActiveTab] = React.useState(tabs[0].id);

  return (
    <div style={{ width: '500px', height: '300px' }}>
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onClick={(id) => setActiveTab(id)}
      />
    </div>
  );
};
