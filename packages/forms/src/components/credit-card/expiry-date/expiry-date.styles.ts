import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px;
`;

export const Separator = styled.div`
  padding: 0 5px;
  color: ${colors.black['200']};
  font-size: 20px;
  flex-shrink: 0;
`;

export const IFrameContainer = styled.div`
  height: 42px;
  width: 44px;
  flexshrink: 0;

  & iframe {
    max-width: 100% !important;
    height: 40px !important;
    overflow: hidden;
  }
`;
