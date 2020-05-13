import * as React from 'react';
import { CDNContext } from '@keen.io/ui-core';

import { CreditCard } from './credit-card.component';

export default {
  title: 'Forms| Credit Card',
  parameters: {
    component: CreditCard,
    componentSubtitle: 'Credit Card form compilant with PCI data security',
  },
};

export const basic = () => (
  <div style={{ width: 400 }}>
    <CDNContext.Provider value={{ url: 'https://static.keen.io/assets' }}>
      <CreditCard />
    </CDNContext.Provider>
  </div>
);
