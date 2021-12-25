import React, { FC, useRef, useEffect, useContext } from 'react';
import { FixedSizeTree as Tree } from 'react-vtree';

import { TreeLeaf, TreeNode } from './components';
import {
  createTreeWalker,
  getPropertiesToRecompute,
  getPropertyPath,
  getPropertyType,
} from './utils';

import PropertiesTreeContext from './context';

import { LIST_HEIGHT, ELEMENT_HEIGHT } from './constants';

type Props = {
  /** Properties tree */
  properties: Record<string, string[] | Record<string, any>>;
  /** Click event handler */
  onClick: (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<Element>,
    propertyPath: string
  ) => void;
  /** The curent active property */
  activeProperty?: string;
  /** Expand all tree levels */
  expanded?: boolean;
  /** Modal container selector */
  modalContainer: string;
};

// todo - add node prop typings when exported from lib: https://github.com/Lodin/react-vtree/pull/82
const Node: FC<any> = ({
  data: { name, isLeaf, schemaMeta, nestingLevel },
  isOpen,
  style,
  setOpen,
  treeData,
}) => {
  const { modalContainer } = useContext(PropertiesTreeContext);
  const { activeProperty, onSelectProperty } = treeData;
  return (
    <div style={style}>
      {isLeaf ? (
        <TreeLeaf
          isActive={activeProperty === getPropertyPath(schemaMeta)}
          propertyName={name}
          onClick={onSelectProperty}
          deepnessLevel={nestingLevel}
          propertyType={getPropertyType(schemaMeta)}
          propertyPath={getPropertyPath(schemaMeta)}
          modalContainer={modalContainer}
        />
      ) : (
        <TreeNode
          name={name}
          isOpen={isOpen}
          deepnessLevel={nestingLevel}
          onClick={() => setOpen(!isOpen)}
        />
      )}
    </div>
  );
};

const PropertiesTree: FC<Props> = ({
  expanded,
  onClick,
  activeProperty,
  properties,
  modalContainer,
}) => {
  const treeRef = useRef(null);
  const expandTrigger = useRef(null);
  const propertiesToRecompute =
    activeProperty && getPropertiesToRecompute(activeProperty);

  useEffect(() => {
    if (expandTrigger.current) clearTimeout(expandTrigger.current);
    if (treeRef.current) {
      treeRef.current.recomputeTree(propertiesToRecompute);
    }
  }, [expanded, treeRef, propertiesToRecompute]);

  return (
    <PropertiesTreeContext.Provider value={{ modalContainer }}>
      <div data-testid="properties-tree">
        <Tree
          ref={treeRef}
          treeWalker={createTreeWalker(properties, expanded)}
          itemData={{ activeProperty, onSelectProperty: onClick }}
          itemSize={ELEMENT_HEIGHT}
          height={LIST_HEIGHT}
          width="100%"
        >
          {Node}
        </Tree>
      </div>
    </PropertiesTreeContext.Provider>
  );
};

export default PropertiesTree;
