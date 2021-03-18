import React, { FC } from 'react';

import { TabsContainer, Tab } from './tabs.styles';

import { TabTypes } from './types';

type Props = {
  /** Tabs configuration */
  tabs: { label: string; id: string }[];
  /** Active Tab */
  activeTab?: string;
  /** Size variant */
  type?: TabTypes;
  /** Click event handler */
  onClick?: (tabId: string) => void;
};

const Tabs: FC<Props> = ({ tabs, activeTab, type = 'default', onClick }) => (
  <TabsContainer data-testid="tabs">
    {tabs.map(({ label, id }) => (
      <Tab
        data-testid="tab"
        type={type}
        key={id}
        onClick={() => onClick(id)}
        isActive={id === activeTab}
      >
        {label}
      </Tab>
    ))}
  </TabsContainer>
);

export default Tabs;
