/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';

import PropertiesTree from './properties-tree.component';
import { properties } from './properties-tree.fixtures';

export default {
  title: 'Components / PropertiesTree',
  parameters: {
    component: PropertiesTree,
    componentSubtitle: 'Properties tree - composed from atomic elements',
  },
};

const initialProperty = 'ad.advertiser';

export const Basic = () => {
  const [activeProperty, setActiveProperty] = React.useState(initialProperty);
  return (
    <>
      <div id="modal-container"></div>
      <PropertiesTree
        properties={properties}
        activeProperty={activeProperty}
        onClick={(_e, property) => setActiveProperty(property)}
        modalContainer="modal-container"
      />
    </>
  );
};
