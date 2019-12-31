/* eslint-disable react/no-children-prop */
import React from 'react';
import styled from 'styled-components';

const DefaultGroup = styled.div``;

type Props = {
  children: React.ReactNode;
  groupNode?: React.FunctionComponent<{ children: React.ReactNode }>;
  chunks?: number;
};

const Group = ({ children, groupNode = DefaultGroup, chunks = 2 }: Props) => {
  const elements = React.Children.toArray(children);
  const childrenGroups = [];
  let temporary;

  for (let i = 0, j = elements.length; i < j; i += chunks) {
    temporary = elements.slice(i, i + chunks);
    childrenGroups.push(temporary);
  }

  return (
    <>
      {childrenGroups.map((group, idx) =>
        React.createElement(groupNode, { key: idx, children: group })
      )}
    </>
  );
};

export default Group;
