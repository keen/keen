import styled, { css } from 'styled-components';
import { colors } from '@keen.io/colors';

export const Tag = styled.div`
  background: ${colors.white['300']};
  border-radius: 13px;
  height: 26px;
  padding: 0 10px;
  margin-top: 5px;

  font-family: 'Lato Regular', sans-serif;
  font-size: 14px;
  line-height: 16px;
  color: ${colors.blue['500']};

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Text = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 140px;
`;

export const IconWrapper = styled.div`
  margin-left: 10px;
  cursor: pointer;
`;

export const StyledInput = styled.input`
  outline: none;
  border: none;
  font-family: 'Lato Regular', sans-serif;

  font-size: 16px;
  line-height: 20px;
  font-weight: normal;
  height: 40px;
  padding: 0;
  width: 100%;
  margin-left: 10px;

  ::placeholder {
    color: #ccc;
  }
`;

export const Container = styled.div<{
  hasError: boolean;
}>`
  width: 100%;
  padding: 0 16px 0 6px;
  box-sizing: border-box;
  border-bottom: solid 1px ${colors.blue['400']};

  display: flex;
  flex-wrap: wrap;
  align-items: center;

  ${(props) =>
    props.hasError &&
    css`
      border-bottom: solid 2px ${colors.orange['300']};
    `}

  ${Tag} {
    margin-right: 5px;
  }
`;
