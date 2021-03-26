import styled from 'styled-components';
import { UI_LAYERS } from '@keen.io/ui-core';

export const WidgetContainer = styled.div`
  position: relative;
  z-index: ${UI_LAYERS.element};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 46px;

  ${WidgetContainer} + ${WidgetContainer} {
    margin-top: 2px;
  }
`;

export const OptionsGroupWrapper = styled.div``;

export const OptionsContainer = styled.div`
  display: flex;

  ${OptionsGroupWrapper} + ${OptionsGroupWrapper} {
    margin-left: 10px;
  }
`;
