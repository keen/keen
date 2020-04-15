import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { Calculator } from '../calculator';
import { Recommendation } from '../recommendation';

import { Wrapper } from './components';
import { getDevice } from './selectors';

import { Layout, Content, OffsetCard, Aside } from './app.styles';

const App: FC<{}> = () => {
  const device = useSelector(getDevice);

  return (
    <Wrapper useCard={device === 'desktop'}>
      <Layout device={device}>
        <Wrapper useCard={device === 'mobile'}>
          <Content>
            <Calculator />
          </Content>
        </Wrapper>
        <Aside>
          <OffsetCard>
            <Recommendation />
          </OffsetCard>
        </Aside>
      </Layout>
    </Wrapper>
  );
};

export default App;
