import styled from 'styled-components';
import { layout, LayoutProps } from 'styled-system';

export const Container = styled.div<LayoutProps>`
  position: relative;
  ${layout};
`;
