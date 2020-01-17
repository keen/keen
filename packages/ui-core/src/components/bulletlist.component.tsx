import React from 'react';
import styled from 'styled-components';

type BulletPoint = {
  color: string;
  value: string;
};

const BulletPoint = (props: { color: string }) => {
  const Bullet = styled.div`
    width: 8px;
    height: 8px;
    margin-right: 6px;
    border-radius: 50%;
    background-color: ${props.color};
  `;
  return <Bullet />;
};

const BulletList = (props: { list: BulletPoint[] }) => {
  const StyledBulletList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
  `;
  const StyledBulletItem = styled.li`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    & ~ & {
      margin-top: 11px;
    }
  `;

  const { list } = props;
  const listItems = list.map(item => {
    return (
      <StyledBulletItem key={item.value}>
        <BulletPoint color={item.color} />
        {item.value}
      </StyledBulletItem>
    );
  });
  return <StyledBulletList>{listItems}</StyledBulletList>;
};

export default BulletList;
