import React, { FC } from 'react';

import { TabsContainer, Tab } from './tabs.styles';

import { TabTypes } from './types';
import { KEYBOARD_KEYS } from '../../constants';

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
  <TabsContainer data-testid="tabs" role="tablist">
    {tabs.map(({ label, id }) => (
      <Tab
        role="tab"
        data-testid="tab"
        type={type}
        key={id}
        onClick={() => onClick(id)}
        onKeyDown={(e) => {
          if (e.keyCode === KEYBOARD_KEYS.ENTER) {
            onClick(id);
          }
        }}
        isActive={id === activeTab}
        tabIndex={0}
      >
        {label}
      </Tab>
    ))}
  </TabsContainer>
);

export default Tabs;
