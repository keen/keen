import styled from 'styled-components';
import { colors } from '@keen.io/colors';
import { transparentize } from 'polished';

export const ButtonInverse = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  border-radius: 5rem;
  border: 1px solid ${colors.white['300']};
  cursor: pointer;

  font-family: 'Lato Regular', sans-serif;

  box-shadow: 0 1px 4px 0 ${transparentize(0.85, colors.black['500'])};

  padding: 12px 16px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  background: transparent;
  color: ${colors.blue['500']};

  &:hover {
    background: #f2f2f2;
    box-shadow: none;
  }

  transition: background 0.2s linear;
`;
