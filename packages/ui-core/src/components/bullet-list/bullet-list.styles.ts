import styled from 'styled-components';

export const StyledBulletList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const StyledBulletItem = styled.li`
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  align-items: center;
  & ~ & {
    margin-top: 11px;
  }
`;

export const BulletPoint = styled.div<{
  color: string;
}>`
  width: 8px;
  height: 8px;
  margin-right: 6px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

export const TextWrapper = styled.div`
  & + & {
    margin-left: 4px;
  }
`;
