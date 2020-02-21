import React from 'react';
import styled from 'styled-components';

type BulletPoint = {
  color: string;
  value: string;
};

const StyledBulletList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const StyledBulletItem = styled.li`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  & ~ & {
    margin-top: 11px;
  }
`;

const BulletPoint = styled.div<{
  color: string;
}>`
  width: 8px;
  height: 8px;
  margin-right: 6px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const BulletList = (props: { list: BulletPoint[] }) => {
  const { list } = props;
  const listItems = list.map((item, idx: number) => {
    return (
      <StyledBulletItem key={`${item.value}.${idx}`}>
        <BulletPoint color={item.color} />
        {item.value}
      </StyledBulletItem>
    );
  });
  return <StyledBulletList>{listItems}</StyledBulletList>;
};

export default BulletList;
