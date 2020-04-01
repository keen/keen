import * as React from 'react';
import styled from 'styled-components';
import { action } from '@storybook/addon-actions';

import HeaderCeil from './header-ceil.component';
import Ceil from './ceil.component';
import SortArrows from './sort-arrows.component';

export default {
  title: 'Components|Table',
  parameters: {
    component: HeaderCeil,
  },
};

const ContainerHeader = styled.div`
  display: table-row;
  background: #27566d;
  cursor: pointer;
`;

const ContainerCeil = styled.div`
  display: table-row;
  background: rgba(29, 39, 41, 0.15);
  cursor: pointer;
`;

const ContainerArrows = styled.div`
  width: 45px;
  display: flex;
  flex-direction: row;
  background: #27566d;
  cursor: pointer;
`;

export const headerCeil = () => {
  return (
    <ContainerHeader>
      <HeaderCeil onClick={action('onClick')}>property</HeaderCeil>
    </ContainerHeader>
  );
};

export const normalCeil = () => {
  return (
    <ContainerCeil>
      <Ceil>0.5</Ceil>
    </ContainerCeil>
  );
};

export const sortArrows = () => {
  return (
    <ContainerArrows>
      <SortArrows type="asc" /> <SortArrows type="desc" />
    </ContainerArrows>
  );
};
