import styled from 'styled-components';
import { layout, LayoutProps } from 'styled-system';

export const Total = styled.div`
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background-color: currentColor;
    opacity: 0.5;
  }
`;

export const TextContainer = styled.div`
  display: flex;
`;

export const LabelContainer = styled.div`
  padding: 10px 15px 0 15px;
`;

export const Container = styled.div<LayoutProps>`
  ${layout};
`;

export const BulletListContainer = styled.div`
  padding: 10px 15px;
`;
