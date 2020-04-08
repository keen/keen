import React, { FC } from 'react';
import { Card } from '@keen.io/ui-core';

import { Calculator } from './calculator';
import { Recommendation } from './recommendation';

import { Layout, Content, OffsetCard, Aside } from './app.styles';

const App: FC<{}> = () => (
  <Card>
    <Layout>
      <Content>
        <Calculator />
      </Content>
      <Aside>
        <OffsetCard>
          <Recommendation />
        </OffsetCard>
      </Aside>
    </Layout>
  </Card>
);

export default App;
